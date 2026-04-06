import { formatCurrency } from '../data/mockData';

export type RiskLevel = 'low' | 'medium' | 'high';
export type BenchmarkBand = 'low' | 'mid' | 'high';

export interface Candidate {
  id: string;
  name: string;
  score: number;
  quote: number;
  benchmark: BenchmarkBand;
  risk: RiskLevel;
  source: string;
  shortlisted: boolean;
  quality: number;
  reliability: number;
  riskScore: number;
  benchmarkMedian: number;
}

export interface RecommendationTier {
  tier: 'Top Pick' | 'Best Value' | 'Budget Safe';
  vendorId: string;
  score: number;
  quote: number;
  savings: number;
  confidence: 'High' | 'Medium';
  explanation: string;
  explanationType: 'Rule-Based' | 'AI-Assisted';
}

export interface GenieRequest {
  id: string;
  category: string;
  city: string;
  budget: number;
  timeline: string;
  quantity: number;
  services: string;
  status: string;
  navigate: string;
  updated: string;
  quote: number;
  candidates: Candidate[];
  recommendationTiers: RecommendationTier[];
  selectedVendorId?: string;
  negotiationTarget?: number;
  negotiationMessage?: string;
  brief?: string;
  savings?: number;
}

const SOURCES = ['IndiaMart', 'Google Maps', 'Instagram', 'Internal DB', 'JustDial'];
const VENDOR_NAMES = ['Sharma', 'Regal', 'BlueOrbit', 'Nova', 'Apex', 'Zenith', 'QuickServe'];

const seedFrom = (text: string) => [...text].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

const seeded = (seed: number, min: number, max: number) => {
  const x = Math.abs(Math.sin(seed) * 10000);
  return min + (x - Math.floor(x)) * (max - min);
};

export const parseMoney = (raw: string | number | undefined): number => {
  if (typeof raw === 'number') return raw;
  if (!raw) return 0;
  const normalized = String(raw).toLowerCase().replace(/,/g, '').trim();
  const base = parseFloat(normalized.replace(/[^0-9.]/g, '')) || 0;
  if (normalized.includes('cr')) return base * 10000000;
  if (normalized.includes('l')) return base * 100000;
  if (normalized.includes('k')) return base * 1000;
  return base;
};

export const parseQuantity = (raw: string): number => {
  const m = raw.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 1;
};

export const generateCandidates = (request: Pick<GenieRequest, 'id' | 'city' | 'category' | 'budget' | 'quantity'>): Candidate[] => {
  const seed = seedFrom(`${request.id}-${request.city}-${request.category}`);
  const unitBase = request.budget > 0 ? request.budget / Math.max(request.quantity, 1) : 500;

  return Array.from({ length: 6 }).map((_, idx) => {
    const priceDelta = seeded(seed + idx, -0.25, 0.2);
    const quote = Math.max(20000, Math.round(unitBase * request.quantity * (1 + priceDelta)));
    const quality = Math.round(seeded(seed + idx * 3, 68, 94));
    const reliability = Math.round(seeded(seed + idx * 7, 65, 95));
    const riskScore = Math.round(seeded(seed + idx * 11, 58, 94));
    const score = Math.round(quality * 0.35 + reliability * 0.35 + riskScore * 0.2 + (100 - Math.min(100, Math.abs(priceDelta) * 180)) * 0.1);
    const benchmarkMedian = Math.round(unitBase * request.quantity * seeded(seed + idx * 5, 0.92, 1.08));
    const ratio = quote / benchmarkMedian;
    const benchmark: BenchmarkBand = ratio < 0.95 ? 'low' : ratio > 1.06 ? 'high' : 'mid';
    const risk: RiskLevel = riskScore > 84 ? 'low' : riskScore > 70 ? 'medium' : 'high';

    return {
      id: `${request.id}-v${idx + 1}`,
      name: `${VENDOR_NAMES[idx]} ${request.category.split(' ')[0]} Partners`,
      score,
      quote,
      benchmark,
      risk,
      source: SOURCES[idx % SOURCES.length],
      shortlisted: idx < 4,
      quality,
      reliability,
      riskScore,
      benchmarkMedian,
    };
  }).sort((a, b) => b.score - a.score);
};

export const buildNegotiationMessage = (candidate: Candidate, target: number, request: Pick<GenieRequest, 'quantity' | 'city'>) =>
  `Hi ${candidate.name} team, thanks for sharing your quote of ${formatCurrency(candidate.quote)} for ${request.quantity} units in ${request.city}. Our benchmark median is ${formatCurrency(candidate.benchmarkMedian)}. Based on volume and repeat potential, can you revise to ${formatCurrency(target)} with same timeline and payment terms?`;

export const generateRecommendationTiers = (candidates: Candidate[], budget: number): RecommendationTier[] => {
  if (!candidates.length) return [];
  const shortlist = candidates.filter((c) => c.shortlisted);
  const sortedByScore = [...shortlist].sort((a, b) => b.score - a.score);
  const sortedByValue = [...shortlist].sort((a, b) => (a.quote / a.score) - (b.quote / b.score));
  const sortedByBudgetSafe = [...shortlist].sort((a, b) => a.quote - b.quote);

  const pick = (list: Candidate[], tier: RecommendationTier['tier'], explanation: string, type: RecommendationTier['explanationType']) => {
    const vendor = list[0] || candidates[0];
    if (!vendor) {
      throw new Error('No vendors available for recommendation generation');
    }
    return {
      tier,
      vendorId: vendor.id,
      score: vendor.score,
      quote: vendor.quote,
      savings: Math.max(0, budget - vendor.quote),
      confidence: vendor.risk === 'low' ? 'High' : 'Medium',
      explanation,
      explanationType: type,
    } as RecommendationTier;
  };

  return [
    pick(sortedByScore, 'Top Pick', 'Highest composite score across price, quality, reliability, and risk.', 'Rule-Based'),
    pick(sortedByValue, 'Best Value', 'Best quote-to-score efficiency among shortlisted vendors.', 'Rule-Based'),
    pick(sortedByBudgetSafe, 'Budget Safe', 'Lowest commercial exposure while meeting baseline quality.', 'AI-Assisted'),
  ];
};

export const buildExecutionBrief = (request: GenieRequest, selected: Candidate | undefined) => {
  if (!selected) return 'No vendor selected yet.';
  return [
    `GENIE-US Execution Brief - ${request.id}`,
    `Category: ${request.category}`,
    `Location: ${request.city}`,
    `Scope: ${request.services}`,
    `Quantity: ${request.quantity}`,
    `Timeline: ${request.timeline}`,
    `Selected Partner: ${selected.name}`,
    `Approved Quote: ${formatCurrency(selected.quote)}`,
    `Risk: ${selected.risk.toUpperCase()}`,
    'Handoff checklist: commercial PO, delivery milestones, quality acceptance criteria, and escalation matrix.',
  ].join('\n');
};

