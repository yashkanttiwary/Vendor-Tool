import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Search, Filter, X } from 'lucide-react';
import { showToast } from '../components/Toast';

export const AuditRisk: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<string | null>(null);

  const [alerts, setAlerts] = useState([
    { id: 'ALT-8492', entity: 'Global Tech Supplies', type: 'GST Mismatch', severity: 'High', date: '2026-04-01', details: 'The GST number provided by the vendor does not match the official records. This could indicate potential fraud or administrative error. Immediate verification is required before proceeding with any transactions.' },
    { id: 'ALT-8491', entity: 'Req #REQ-2026-089', type: 'Budget Exceeded (+15%)', severity: 'Medium', date: '2026-03-30', details: 'The current quotes for this request exceed the allocated budget by 15%. Review the requirements or request additional budget approval.' },
    { id: 'ALT-8490', entity: 'Metro Caterers', type: 'Missing Insurance Cert', severity: 'Medium', date: '2026-03-28', details: 'The vendor has not provided a valid insurance certificate. This is a mandatory requirement for all vendors providing on-site services.' },
  ]);

  const handleResolve = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    showToast(`Alert ${id} resolved`);
    if (selectedAlert?.id === id) {
      setSelectedAlert(null);
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = filterSeverity ? alert.severity === filterSeverity : true;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1D23]">Audit & Risk Dashboard</h1>
          <p className="text-gray-500 mt-2 text-lg">Monitor compliance, vendor risks, and anomalies across all operations.</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vendors, requests..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                filterSeverity ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" /> 
              {filterSeverity ? `Severity: ${filterSeverity}` : 'Filter'}
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-10">
                <div className="py-1">
                  <button
                    onClick={() => { setFilterSeverity(null); setIsFilterOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm ${!filterSeverity ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    All Severities
                  </button>
                  <button
                    onClick={() => { setFilterSeverity('High'); setIsFilterOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm ${filterSeverity === 'High' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    High Severity
                  </button>
                  <button
                    onClick={() => { setFilterSeverity('Medium'); setIsFilterOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm ${filterSeverity === 'Medium' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Medium Severity
                  </button>
                  <button
                    onClick={() => { setFilterSeverity('Low'); setIsFilterOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm ${filterSeverity === 'Low' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Low Severity
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">High Risk Vendors</h3>
            <div className="p-2 bg-red-100 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div className="text-3xl font-mono font-bold text-[#1A1D23]">{alerts.filter(a => a.severity === 'High').length}</div>
          <div className="text-sm text-red-600 mt-2 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1" /> Needs attention
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Compliance Score</h3>
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-mono font-bold text-[#1A1D23]">94%</div>
          <div className="text-sm text-green-600 mt-2 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-1" /> Target: 95%
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Pending Audits</h3>
            <div className="p-2 bg-amber-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="text-3xl font-mono font-bold text-[#1A1D23]">{alerts.length}</div>
          <div className="text-sm text-gray-500 mt-2">
            Requires manual review
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#1A1D23]">Recent Risk Alerts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Alert ID</th>
                <th className="p-4">Entity</th>
                <th className="p-4">Risk Type</th>
                <th className="p-4">Severity</th>
                <th className="p-4">Date</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-mono text-xs">{alert.id}</td>
                    <td className="p-4 font-medium text-[#1A1D23]">{alert.entity}</td>
                    <td className="p-4">{alert.type}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        alert.severity === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">{alert.date}</td>
                    <td className="p-4 space-x-3">
                      <button 
                        onClick={() => setSelectedAlert(alert)}
                        className="text-blue-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                      >
                        Review
                      </button>
                      <button 
                        onClick={() => handleResolve(alert.id)}
                        className="text-green-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
                      >
                        Resolve
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No alerts found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedAlert.severity === 'High' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedAlert.id}</h3>
                  <p className="text-sm text-gray-500">{selectedAlert.type}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAlert(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Entity</h4>
                  <p className="text-gray-900 font-medium">{selectedAlert.entity}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Severity</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedAlert.severity === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedAlert.severity}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Date Detected</h4>
                    <p className="text-gray-900">{selectedAlert.date}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Alert Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                    {selectedAlert.details}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedAlert(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              >
                Close
              </button>
              <button 
                onClick={() => handleResolve(selectedAlert.id)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
