import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PipelineBar } from '../components/PipelineBar';
import { formatCurrency, mockRequest } from '../data/mockData';
import { Candidate, RecommendationTier, buildExecutionBrief, generateRecommendationTiers } from '../utils/genieEngine';
import { updateRequestState } from '../utils/requestManager';
import { upsertRequestRecord } from '../utils/requestStore';

export const Recommendation: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const [currentRequest, setCurrentRequest] = useState<any>(mockRequest);
  const [selectedTier, setSelectedTier] = useState<'Top Pick' | 'Best Value' | 'Budget Safe'>('Top Pick');

  useEffect(() => {
    const stored = window.localStorage.getItem('genie-us-current-request');
    if (stored) setCurrentRequest({ ...mockRequest, ...JSON.parse(stored) });
  }, []);

  const tiers: RecommendationTier[] = currentRequest.recommendationTiers?.length ? currentRequest.recommendationTiers : generateRecommendationTiers(currentRequest.candidates || [], currentRequest.budget || 0);
  const activeTier = tiers.find((t) => t.tier === selectedTier) || tiers[0];
  const selectedVendor: Candidate | undefined = useMemo(
    () => currentRequest.candidates?.find((c: Candidate) => c.id === activeTier?.vendorId),
    [currentRequest, activeTier],
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Recommendation Engine</h1>
      <PipelineBar currentState="recommended" onNavigate={() => {}} />

      {!tiers.length && <div className="mt-6 p-4 border rounded bg-amber-50 text-amber-700 text-sm">No recommendation tiers available. Please complete Discovery/Negotiation first.</div>}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {tiers.map((tier) => (
          <button key={tier.tier} onClick={() => setSelectedTier(tier.tier)} className={`border rounded-lg p-4 text-left ${selectedTier === tier.tier ? 'border-blue-600 bg-blue-50' : 'bg-white'}`}>
            <div className="font-semibold">{tier.tier}</div>
            <div className="text-sm">Score {tier.score}</div>
            <div className="text-sm">Quote {formatCurrency(tier.quote)}</div>
          </button>
        ))}
      </div>

      {activeTier && selectedVendor && (
        <div className="bg-white border rounded-lg p-5 mt-6">
          <h2 className="text-xl font-bold">{selectedVendor.name}</h2>
          <p className="text-sm text-gray-600">{activeTier.explanation} ({activeTier.explanationType})</p>
          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
            <div>Quote: <strong>{formatCurrency(selectedVendor.quote)}</strong></div>
            <div>Savings: <strong>{formatCurrency(activeTier.savings)}</strong></div>
            <div>Risk: <strong>{selectedVendor.risk}</strong></div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button onClick={() => onNavigate('negotiation')} className="flex items-center"><ArrowLeft className="w-4 h-4 mr-1"/>Back</button>
        <button
          disabled={!selectedVendor}
          className={`flex items-center px-4 py-2 rounded ${selectedVendor ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          onClick={() => {
            if (!selectedVendor) return;
            const next = {
              ...currentRequest,
              selectedVendorId: selectedVendor.id,
              brief: buildExecutionBrief(currentRequest, selectedVendor),
              savings: Math.max(0, (currentRequest.budget || 0) - selectedVendor.quote),
              status: 'Studio',
              navigate: 'studio',
            };
            window.localStorage.setItem('genie-us-current-request', JSON.stringify(next));
            upsertRequestRecord(next as any);
            updateRequestState(currentRequest.id, 'Studio', 'studio');
            onNavigate('studio');
          }}
        >Generate STUDIO Brief<ArrowRight className="w-4 h-4 ml-1" /></button>
      </div>
    </div>
  );
};
