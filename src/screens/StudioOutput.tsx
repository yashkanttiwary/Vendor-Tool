import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PipelineBar } from '../components/PipelineBar';
import { mockRequest } from '../data/mockData';
import { addAuditLog } from '../utils/auditLogger';
import { updateRequestState } from '../utils/requestManager';
import { upsertRequestRecord } from '../utils/requestStore';
import { aiBrief } from '../utils/aiClient';

export const StudioOutput: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const [currentRequest, setCurrentRequest] = useState<any>(mockRequest);
  const [brief, setBrief] = useState('');

  useEffect(() => {
    const bootstrap = async () => {
      const stored = window.localStorage.getItem('genie-us-current-request');
      if (!stored) return;
      const parsed = JSON.parse(stored);
      const merged = { ...mockRequest, ...parsed };
      if (!merged.brief && merged.selectedVendorId) {
        const vendor = merged.candidates?.find((c: any) => c.id === merged.selectedVendorId);
        if (vendor) {
          const ai = await aiBrief(merged, vendor);
          if (ai?.briefText) merged.brief = ai.briefText;
        }
      }
      setCurrentRequest(merged);
      setBrief(merged.brief || 'Execution brief is unavailable. Please return to Recommendation and generate again.');
    };
    bootstrap();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">STUDIO Execution Brief</h1>
      <PipelineBar currentState="recommended" onNavigate={() => {}} />

      <div className="bg-white border rounded-lg p-5 mt-6">
        <textarea value={brief} onChange={(e) => setBrief(e.target.value)} className="w-full min-h-[260px] border rounded p-3 font-mono text-sm" />
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={() => onNavigate('recommendation')} className="flex items-center"><ArrowLeft className="w-4 h-4 mr-1" />Back</button>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => {
            const next = { ...currentRequest, brief, status: 'Approval', navigate: 'approval' };
            window.localStorage.setItem('genie-us-current-request', JSON.stringify(next));
            upsertRequestRecord(next as any);
            updateRequestState(currentRequest.id, 'Approval', 'approval');
            addAuditLog('Brief Finalized', `STUDIO brief finalized for ${currentRequest.id}`);
            onNavigate('approval');
          }}
        >Submit for Approval<ArrowRight className="w-4 h-4 ml-1" /></button>
      </div>
    </div>
  );
};
