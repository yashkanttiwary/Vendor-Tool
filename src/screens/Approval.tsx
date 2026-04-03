import React, { useState } from 'react';
import { ArrowLeft, Check, X, RotateCcw, ShieldCheck, TrendingDown, Clock, User } from 'lucide-react';
import { PipelineBar, PipelineState } from '../components/PipelineBar';
import { mockRequest, formatCurrency } from '../data/mockData';
import { sanitizeInput } from '../utils/sanitize';
import { useLocalStorage } from '../utils/useLocalStorage';

export const Approval: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const [auditNote, setAuditNote] = useLocalStorage('auditNote', '');
  const [isApproved, setIsApproved] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'approve' | 'reject' | 'revise' | null>(null);

  const handleActionClick = (action: 'approve' | 'reject' | 'revise') => {
    if (action === 'approve' && !auditNote.trim()) {
      alert("Audit note is required for approval.");
      return;
    }
    setConfirmAction(action);
  };

  const executeAction = () => {
    if (confirmAction === 'approve') {
      const sanitizedNote = sanitizeInput(auditNote);
      // In a real app, we would send sanitizedNote to the backend
      // console.log("Approved with note:", sanitizedNote);
      setIsApproved(true);
      setAuditNote(''); // Clear note after successful approval
    } else if (confirmAction === 'reject') {
      onNavigate('workspace');
    } else if (confirmAction === 'revise') {
      onNavigate('recommendation');
    }
    setConfirmAction(null);
  };

  const handlePipelineNavigate = (state: PipelineState) => {
    const stateToScreenMap: Record<string, string> = {
      'parsed': 'parsed',
      'discovering': 'discovery',
      'negotiation_ready': 'negotiation',
      'recommended': 'recommendation',
      'awaiting_approval': 'approval',
    };
    if (stateToScreenMap[state]) {
      onNavigate(stateToScreenMap[state]);
    }
  };

  if (isApproved) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center mt-20">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-[#1A1D23] mb-4">Request Approved</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Vendor B has been approved for {formatCurrency(240000)}. The execution brief has been sent to the operations team.
        </p>
        <button 
          onClick={() => onNavigate('workspace')}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Return to Workspace
        </button>
      </div>
    );
  }

  const handleBack = () => {
    onNavigate('studio');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1D23]">Approval Required</h1>
          <p className="text-gray-500 mt-1 font-mono text-sm">Request #{mockRequest.id}</p>
        </div>
      </div>

      <PipelineBar currentState="awaiting_approval" onNavigate={handlePipelineNavigate} />

      <div className="bg-white rounded-lg border border-gray-200 shadow-lg mb-8 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">Final Recommendation Summary</h2>
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-bold text-[#1A1D23] mb-2">Sharma Furniture Co.</h3>
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                  HIGH CONFIDENCE
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> LOW RISK
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-mono font-bold text-[#1A1D23]">{formatCurrency(240000)}</div>
              <div className="text-sm font-medium text-green-600 flex items-center justify-end mt-1">
                <TrendingDown className="w-4 h-4 mr-1" /> Savings: {formatCurrency(60000)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 bg-[#F8F9FA] p-6 rounded-lg border border-gray-100">
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Score</div>
              <div className="text-xl font-mono font-bold text-[#1A1D23]">87/100</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Benchmark</div>
              <div className="text-sm font-medium text-[#1A1D23] mt-1">At Mid (+4.3%)</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Category</div>
              <div className="text-sm font-medium text-[#1A1D23] mt-1">Vendor Procurement</div>
            </div>
          </div>
        </div>

        <div className="p-8 border-b border-gray-100 bg-[#F8F9FA]">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Evidence Snapshot</h2>
          <ul className="space-y-3">
            {[
              "3 benchmark sources verified (IndiaMart, Google Maps, Internal DB)",
              "Quote collected via WhatsApp on 2026-03-28",
              "Negotiation reduced initial quote from ₹2.6L to ₹2.4L",
              "2 alternative options evaluated (Regal Event Supplies, Delhi Chair Mart)",
              "Vendor has 3 prior successful PW orders"
            ].map((item, i) => (
              <li key={i} className="flex items-start text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-3 shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 bg-white">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Audit Note <span className="text-red-500">*</span></h2>
          <textarea
            value={auditNote}
            onChange={(e) => setAuditNote(e.target.value)}
            placeholder="Add your review notes here. This will be permanently recorded in the audit trail..."
            className="w-full min-h-[100px] p-4 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors resize-y text-sm text-[#1A1D23] mb-8 outline-none"
          />

          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => handleActionClick('approve')}
              className="flex items-center justify-center px-6 py-4 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-lg rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Check className="w-6 h-6 mr-2" /> APPROVE
            </button>
            <button 
              onClick={() => handleActionClick('reject')}
              className="flex items-center justify-center px-6 py-4 bg-white border-2 border-red-500 text-red-600 hover:bg-red-50 font-bold text-lg rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <X className="w-6 h-6 mr-2" /> REJECT
            </button>
            <button 
              onClick={() => handleActionClick('revise')}
              className="flex items-center justify-center px-6 py-4 bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-bold text-lg rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              <RotateCcw className="w-6 h-6 mr-2" /> REVISE
            </button>
          </div>
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500 font-mono">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" /> Approver: Amit Sharma (Finance Controller)
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" /> Timestamp: {new Date().toISOString()}
          </div>
        </div>
      </div>

      <div className="flex justify-start pt-2">
        <button 
          onClick={handleBack}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to STUDIO Output
        </button>
      </div>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {confirmAction === 'approve' ? 'Confirm Approval' : 
               confirmAction === 'reject' ? 'Confirm Rejection' : 'Request Revision'}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {confirmAction === 'approve' ? 'Are you sure you want to approve this request and issue the Purchase Order? This action cannot be undone easily.' : 
               confirmAction === 'reject' ? 'Are you sure you want to reject this request? The sourcing team will be notified.' : 
               'Are you sure you want to request a revision? This will send the request back to the recommendation stage.'}
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button 
                onClick={executeAction}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  confirmAction === 'approve' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : 
                  confirmAction === 'reject' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 
                  'bg-amber-500 hover:bg-amber-600 focus:ring-amber-500'
                }`}
              >
                {confirmAction === 'approve' ? 'Yes, Approve' : 
                 confirmAction === 'reject' ? 'Yes, Reject' : 'Yes, Request Revision'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
