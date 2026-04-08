import { getAuthSession } from './auth';

const callAi = async <T>(path: string, body: Record<string, unknown>): Promise<T | null> => {
  const session = getAuthSession();
  if (!session?.token || session.token.startsWith('demo-')) return null;

  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-token': session.token,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
};

export const aiParseScope = (prompt: string) => callAi<{ parsed: any }>('/api/ai/parse', { prompt });
export const aiDiscoverCandidates = (request: any) => callAi<{ candidates: any[] }>('/api/ai/discovery', { request });
export const aiRecommend = (request: any, candidates: any[]) => callAi<{ recommendationTiers: any[] }>('/api/ai/recommend', { request, candidates });
export const aiNegotiate = (request: any, candidate: any) => callAi<{ targetPrice?: number; message?: string }>('/api/ai/negotiate', { request, candidate });
export const aiBrief = (request: any, selectedVendor: any) => callAi<{ briefText?: string }>('/api/ai/brief', { request, selectedVendor });

export const aiResearch = (payload: { city: string; category: string; services?: string; quantity?: number; budget?: number }) => callAi<{ vendorResearch: any[] }>('/api/ai/research', payload);
