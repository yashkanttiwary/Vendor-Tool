import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Search, Filter } from 'lucide-react';
import { showToast } from '../components/Toast';

export const AuditRisk: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [alerts, setAlerts] = useState([
    { id: 'ALT-8492', entity: 'Global Tech Supplies', type: 'GST Mismatch', severity: 'High', date: '2026-04-01' },
    { id: 'ALT-8491', entity: 'Req #REQ-2026-089', type: 'Budget Exceeded (+15%)', severity: 'Medium', date: '2026-03-30' },
    { id: 'ALT-8490', entity: 'Metro Caterers', type: 'Missing Insurance Cert', severity: 'Medium', date: '2026-03-28' },
  ]);

  const handleResolve = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    showToast(`Alert ${id} resolved`);
  };

  const filteredAlerts = alerts.filter(alert => 
    alert.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <button 
            onClick={() => showToast('Advanced filters coming soon')}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
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
                        onClick={() => showToast(`Reviewing ${alert.id}`)}
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
    </div>
  );
};
