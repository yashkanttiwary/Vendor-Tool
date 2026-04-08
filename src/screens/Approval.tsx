import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { PipelineBar } from '../components/PipelineBar';
import { formatCurrency, mockRequest } from '../data/mockData';
import { addAuditLog } from '../utils/auditLogger';
import { updateRequestState } from '../utils/requestManager';
import { upsertRequestRecord } from '../utils/requestStore';
import { Candidate } from '../utils/genieEngine';

export const Approval: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const [currentRequest, setCurrentRequest] = useState<any>(mockRequest);
  const [auditNote, setAuditNote] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('genie-us-current-request');
    if (stored) setCurrentRequest({ ...mockRequest, ...JSON.parse(stored) });
  }, []);

  const vendor: Candidate | undefined = useMemo(
    () => currentRequest.candidates?.find((c: Candidate) => c.id === currentRequest.selectedVendorId),
    [currentRequest],
  );

  if (done) {
    return <div className="p-10 text-center"><Check className="w-12 h-12 text-green-600 mx-auto mb-3" /><h2 className="text-2xl font-bold">Approved</h2><button className="mt-4 px-4 py-2 border rounded" onClick={() => onNavigate('workspace')}>Return to Workspace</button></div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Manager Approval</h1>
      <PipelineBar currentState="awaiting_approval" onNavigate={() => {}} />

      <div className="bg-white border rounded-lg p-5 mt-6 space-y-3">
        <div>Request: <span className="font-mono">{currentRequest.id}</span></div>
        <div>Selected Vendor: <strong>{vendor?.name || 'N/A'}</strong></div>
        <div>Final Quote: <strong>{vendor ? formatCurrency(vendor.quote) : 'N/A'}</strong></div>
        <div>Savings vs Budget: <strong>{formatCurrency(currentRequest.savings || 0)}</strong></div>
        <textarea value={auditNote} onChange={(e) => setAuditNote(e.target.value)} placeholder="Audit note is mandatory" className="w-full min-h-[120px] border rounded p-3" />
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={() => onNavigate('studio')} className="flex items-center"><ArrowLeft className="w-4 h-4 mr-1"/>Back</button>
        <div className="space-x-2">
          <button className="px-4 py-2 border rounded" onClick={() => { const next = { ...currentRequest, status: 'Revision Requested', navigate: 'recommendation' }; updateRequestState(currentRequest.id, 'Revision Requested', 'recommendation'); window.localStorage.setItem('genie-us-current-request', JSON.stringify(next)); upsertRequestRecord(next as any); onNavigate('recommendation'); }}>Request Revision</button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => {
              if (!auditNote.trim()) return;
              const next = { ...currentRequest, status: 'Done', navigate: 'workspace', approvedAt: new Date().toISOString(), auditNote };
              updateRequestState(currentRequest.id, 'Done', 'workspace');
              window.localStorage.setItem('genie-us-current-request', JSON.stringify(next));
              upsertRequestRecord(next as any);
              addAuditLog('Request Approved', `${currentRequest.id} approved with note: ${auditNote}`);
              setDone(true);
            }}
          >Approve</button>
        </div>
      </div>
    </div>
  );
};
