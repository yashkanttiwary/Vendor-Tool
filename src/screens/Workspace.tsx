import React, { useState } from 'react';
import { TrendingUp, ArrowUpRight, CheckCircle2, Clock, X } from 'lucide-react';
import { formatCurrency } from '../data/mockData';
import { showToast } from '../components/Toast';
import { useLocalStorage } from '../utils/useLocalStorage';

export const Workspace: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  const [requests, setRequests] = useLocalStorage('genie-us-requests', [
    { id: 'GU-0142', category: 'Vendor Procurement', status: 'Negotiation', quote: 240000, updated: '2h ago', navigate: 'parsed' },
    { id: 'GU-0139', category: 'Influencer Sourcing', status: 'Approval', quote: 180000, updated: '5h ago' },
    { id: 'GU-0135', category: 'Event Sourcing', status: 'Done', quote: 520000, updated: '1d ago' },
  ]);

  const handleRequestClick = (request: any, navigateTo?: string) => {
    if (navigateTo) {
      onNavigate(navigateTo);
    } else {
      setSelectedRequest(request);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1D23]">Workspace Overview</h1>
        <p className="text-gray-500 mt-1">Operational status and active requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-xs">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Active Requests</div>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-mono font-bold text-[#1A1D23]">{requests.length}</div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" /> +{requests.length > 3 ? requests.length - 3 : 0}
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-xs">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Total Savings</div>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-mono font-bold text-[#1A1D23]">{formatCurrency(420000)}</div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" /> 14%
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-xs">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Approval Rate</div>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-mono font-bold text-[#1A1D23]">94%</div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 mr-1" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-xs">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Avg Cycle Time</div>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-mono font-bold text-[#1A1D23]">1.8d</div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <Clock className="w-4 h-4 mr-1" /> -0.4d
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#F1F3F5]">
          <h2 className="text-sm font-semibold text-[#1A1D23] uppercase tracking-wider">Active Requests</h2>
          <button 
            onClick={() => onNavigate('command')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            New Request
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs uppercase tracking-wider text-gray-500 font-medium">
                <th className="px-6 py-3">Request ID</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Quote</th>
                <th className="px-6 py-3">Last Updated</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {requests.map((req, index) => (
                <tr 
                  key={req.id}
                  className={`border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${index === requests.length - 1 ? 'border-b-0' : ''}`}
                  onClick={() => handleRequestClick(req, req.navigate)}
                >
                  <td className="px-6 py-4 font-mono text-[#1A1D23]">{req.id}</td>
                  <td className="px-6 py-4 text-gray-700">{req.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      req.status === 'Negotiation' ? 'bg-blue-50 text-blue-700' :
                      req.status === 'Approval' ? 'bg-amber-50 text-amber-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        req.status === 'Negotiation' ? 'bg-blue-600 animate-pulse' :
                        req.status === 'Approval' ? 'bg-amber-500' :
                        'bg-green-600'
                      }`}></span>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-[#1A1D23]">{formatCurrency(req.quote)}</td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">{req.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Request Details</h3>
                <p className="text-sm text-gray-500 font-mono">{selectedRequest.id}</p>
              </div>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Category</h4>
                    <p className="text-gray-900 font-medium">{selectedRequest.category}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedRequest.status === 'Negotiation' ? 'bg-blue-100 text-blue-800' :
                      selectedRequest.status === 'Approval' ? 'bg-amber-100 text-amber-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedRequest.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Quote</h4>
                    <p className="text-gray-900 font-mono">{formatCurrency(selectedRequest.quote)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h4>
                    <p className="text-gray-900 font-mono text-sm">{selectedRequest.updated}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
