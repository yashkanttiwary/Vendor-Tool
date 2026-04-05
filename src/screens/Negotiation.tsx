import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PipelineBar } from '../components/PipelineBar';
import { formatCurrency, mockRequest } from '../data/mockData';
import { buildNegotiationMessage, Candidate } from '../utils/genieEngine';
import { addAuditLog } from '../utils/auditLogger';
import { updateRequestState } from '../utils/requestManager';
import { upsertRequestRecord } from '../utils/requestStore';

export const Negotiation: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const [currentRequest, setCurrentRequest] = useState<any>(mockRequest);
  const [selectedVendorId, setSelectedVendorId] = useState<string>('');
  const [target, setTarget] = useState<number>(0);

  useEffect(() => {
    const stored = window.localStorage.getItem('genie-us-current-request');
    if (stored) {
      const parsed = JSON.parse(stored);
      setCurrentRequest({ ...mockRequest, ...parsed });
      const top = parsed.candidates?.find((c: Candidate) => c.shortlisted) || parsed.candidates?.[0];
      if (top) {
        setSelectedVendorId(top.id);
        setTarget(parsed.negotiationTarget || Math.round(top.quote * 0.92));
      }
    }
  }, []);

  const vendor = useMemo(() => currentRequest.candidates?.find((c: Candidate) => c.id === selectedVendorId), [currentRequest, selectedVendorId]);
  const message = vendor ? buildNegotiationMessage(vendor, target, currentRequest) : '';

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Negotiation Console</h1>
      <p className="text-sm text-gray-500 font-mono">Request #{currentRequest.id}</p>
      <PipelineBar currentState="negotiation_ready" onNavigate={() => {}} />

      <div className="bg-white border rounded-lg p-5 mt-6 space-y-4">
        <div>
          <label className="text-sm">Vendor</label>
          <select className="w-full border rounded p-2" value={selectedVendorId} onChange={(e) => setSelectedVendorId(e.target.value)}>
            {currentRequest.candidates?.filter((c: Candidate) => c.shortlisted).map((c: Candidate) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        {vendor && <div className="text-sm">Current quote: <strong>{formatCurrency(vendor.quote)}</strong> • Benchmark: {formatCurrency(vendor.benchmarkMedian)}</div>}
        <div>
          <label className="text-sm">Target counter-offer</label>
          <input className="w-full border rounded p-2" type="number" value={target} onChange={(e) => setTarget(parseInt(e.target.value || '0', 10))} />
        </div>
        <div>
          <label className="text-sm">Ready-to-send message</label>
          <textarea className="w-full border rounded p-3 min-h-[140px]" value={message} readOnly />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={() => onNavigate('discovery')} className="flex items-center"><ArrowLeft className="w-4 h-4 mr-1"/>Back</button>
        <button
          disabled={!vendor}
          onClick={() => {
            const next = { ...currentRequest, selectedVendorId, negotiationTarget: target, negotiationMessage: message, status: 'Recommendation', navigate: 'recommendation' };
            window.localStorage.setItem('genie-us-current-request', JSON.stringify(next));
            upsertRequestRecord(next as any);
            updateRequestState(currentRequest.id, 'Recommendation', 'recommendation');
            addAuditLog('Negotiation Prepared', `Negotiation target set at ${target} for ${currentRequest.id}`);
            onNavigate('recommendation');
          }}
          className={`flex items-center px-4 py-2 rounded ${vendor ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >Continue<ArrowRight className="w-4 h-4 ml-1" /></button>
      </div>
    </div>
  );
};
