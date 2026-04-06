import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Edit2, ArrowRight, ArrowLeft, Save, X } from 'lucide-react';
import { PipelineBar } from '../components/PipelineBar';
import { mockRequest, formatCurrency } from '../data/mockData';
import { showToast } from '../components/Toast';
import { addAuditLog } from '../utils/auditLogger';
import { updateRequestState } from '../utils/requestManager';
import { upsertRequestRecord } from '../utils/requestStore';

export const ParsedScope: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const [currentRequest, setCurrentRequest] = useState<any>(mockRequest);
  const [needsReview, setNeedsReview] = useState(mockRequest.needsReview);
  const [assumptions, setAssumptions] = useState(mockRequest.assumptions);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('genie-us-current-request');
      if (stored) {
        const parsed = JSON.parse(stored);
        setCurrentRequest({
          ...mockRequest,
          ...parsed,
          category: parsed.category || mockRequest.category,
          city: parsed.city || mockRequest.city,
          budget: parsed.budget || mockRequest.budget,
          timeline: parsed.timeline || mockRequest.timeline,
          quantity: parsed.quantity || mockRequest.quantity,
          services: parsed.services || mockRequest.services,
        });
        setAssumptions([
          { id: 1, text: `Scope interpreted as ${parsed.services || mockRequest.services}`, confidence: 'HIGH' },
          { id: 2, text: `Budget cap locked at ${typeof parsed.budget === 'number' ? formatCurrency(parsed.budget) : parsed.budget || 'Unspecified'}`, confidence: 'HIGH' },
          { id: 3, text: `Delivery location confirmed for ${parsed.city || mockRequest.city}`, confidence: 'MEDIUM' },
        ]);
        setNeedsReview(parsed.city && parsed.budget ? [] : [{ id: 1, text: 'Please confirm missing city/budget details before discovery.' }]);
      }
    } catch (e) {
      console.error("Error parsing stored request", e);
    }
  }, []);

  const [editingAssumptionId, setEditingAssumptionId] = useState<string | null>(null);
  const [editAssumptionText, setEditAssumptionText] = useState('');

  const handleResolveReview = (id: string) => {
    setNeedsReview(prev => prev.filter(item => item.id !== id));
    addAuditLog('Review Resolved', `Resolved review item ${id} for request ${currentRequest.id}`);
    showToast('Review item resolved');
  };

  const startEditAssumption = (id: string, text: string) => {
    setEditingAssumptionId(id);
    setEditAssumptionText(text);
  };

  const saveAssumption = (id: string) => {
    if (!editAssumptionText.trim()) return;
    setAssumptions(prev => prev.map(item => 
      item.id === id ? { ...item, text: editAssumptionText } : item
    ));
    setEditingAssumptionId(null);
    addAuditLog('Assumption Updated', `Updated assumption ${id} for request ${currentRequest.id}`);
    showToast('Assumption updated');
  };

  const cancelEditAssumption = () => {
    setEditingAssumptionId(null);
    setEditAssumptionText('');
  };

  const handlePipelineNavigate = (state: string) => {
    const stateToScreenMap: Record<string, string> = {
      'parsed': 'parsed',
      'discovering': 'discovery',
      'shortlisted': 'discovery',
      'negotiation_ready': 'negotiation',
      'recommended': 'recommendation',
      'awaiting_approval': 'approval',
    };
    if (stateToScreenMap[state]) {
      onNavigate(stateToScreenMap[state]);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1D23]">Request #{currentRequest.id}</h1>
          <p className="text-gray-500 mt-1">Review and confirm structured scope</p>
        </div>
      </div>

      <PipelineBar currentState="parsed" onNavigate={handlePipelineNavigate} />

      <div className="bg-white rounded-lg border border-gray-100 shadow-xs mb-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-[#F1F3F5] flex justify-between items-center">
          <h2 className="text-sm font-semibold text-[#1A1D23] uppercase tracking-wider">Structured Scope</h2>
          <button 
            onClick={() => onNavigate('command')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            <Edit2 className="w-4 h-4 mr-1" /> Edit Scope
          </button>
        </div>
        
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <tbody className="text-sm">
              <tr className="border-b border-gray-50">
                <td className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-gray-500 w-1/3">Category</td>
                <td className="px-6 py-4 font-medium text-[#1A1D23] flex items-center justify-between">
                  {currentRequest.category}
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-gray-500">City / Location</td>
                <td className="px-6 py-4 font-medium text-[#1A1D23] flex items-center justify-between">
                  {currentRequest.city}
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-gray-500">Budget</td>
                <td className="px-6 py-4 font-mono font-medium text-[#1A1D23] flex items-center justify-between">
                  {typeof currentRequest.budget === 'number' ? formatCurrency(currentRequest.budget) : currentRequest.budget}
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-gray-500">Timeline</td>
                <td className="px-6 py-4 font-medium text-[#1A1D23] flex items-center justify-between">
                  {currentRequest.timeline}
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-gray-500">Services</td>
                <td className="px-6 py-4 font-medium text-[#1A1D23] flex items-center justify-between">
                  {currentRequest.services}
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-gray-500">Quantity</td>
                <td className="px-6 py-4 font-mono font-medium text-[#1A1D23] flex items-center justify-between">
                  {currentRequest.quantity}
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-amber-50/30 rounded-lg border border-amber-100 shadow-xs p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#1A1D23] uppercase tracking-wider">Assumptions (AI-Inferred)</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Confidence: HIGH
            </span>
          </div>
          <ul className="space-y-3">
            {assumptions.map(assumption => (
              <li key={assumption.id} className="flex items-start justify-between text-sm text-gray-700 bg-white p-3 rounded-md border border-amber-50 shadow-xs">
                {editingAssumptionId === assumption.id ? (
                  <div className="flex-1 mr-4">
                    <input
                      type="text"
                      value={editAssumptionText}
                      onChange={(e) => setEditAssumptionText(e.target.value)}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveAssumption(assumption.id);
                        if (e.key === 'Escape') cancelEditAssumption();
                      }}
                    />
                  </div>
                ) : (
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                    {assumption.text}
                  </span>
                )}
                
                {editingAssumptionId === assumption.id ? (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => saveAssumption(assumption.id)}
                      className="text-green-600 hover:text-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded p-1"
                      title="Save"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={cancelEditAssumption}
                      className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 rounded p-1"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => startEditAssumption(assumption.id, assumption.text)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                  >
                    Edit
                  </button>
                )}
              </li>
            ))}
            {assumptions.length === 0 && (
              <li className="text-sm text-gray-500 italic">No assumptions.</li>
            )}
          </ul>
        </div>

        <div className="bg-red-50/30 rounded-lg border border-red-100 shadow-xs p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#1A1D23] uppercase tracking-wider flex items-center">
              <AlertTriangle className="w-4 h-4 text-amber-500 mr-2" /> Needs Review
            </h3>
            {needsReview.length > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                ⚠ {needsReview.length} item{needsReview.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <ul className="space-y-3">
            {needsReview.map(item => (
              <li key={item.id} className="flex items-start justify-between text-sm text-gray-700 bg-white p-3 rounded-md border border-red-50 shadow-xs">
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                  {item.text}
                </span>
                <button 
                  onClick={() => handleResolveReview(item.id)}
                  className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  Resolve
                </button>
              </li>
            ))}
            {needsReview.length === 0 && (
              <li className="text-sm text-green-600 flex items-center bg-green-50 p-3 rounded-md border border-green-100">
                <CheckCircle2 className="w-4 h-4 mr-2" /> All review items resolved.
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button 
          onClick={() => onNavigate('command')}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Edit Request
        </button>
        <button 
          onClick={() => {
            updateRequestState(currentRequest.id, 'Discovery', 'discovery');
            const next = { ...currentRequest, status: 'Discovery', navigate: 'discovery' };
            window.localStorage.setItem('genie-us-current-request', JSON.stringify(next));
            upsertRequestRecord(next as any);
            addAuditLog('Stage Advanced', `Advanced request ${currentRequest.id} to Discovery`);
            onNavigate('discovery');
          }}
          className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Proceed to Discovery <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};
