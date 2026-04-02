import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Search, Filter } from 'lucide-react';

export const AuditRisk: React.FC = () => {
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
              placeholder="Search vendors, requests..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md transition-colors">
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
          <div className="text-3xl font-mono font-bold text-[#1A1D23]">12</div>
          <div className="text-sm text-red-600 mt-2 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1" /> +3 this week
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
          <div className="text-3xl font-mono font-bold text-[#1A1D23]">8</div>
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
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-mono text-xs">ALT-8492</td>
                <td className="p-4 font-medium text-[#1A1D23]">Global Tech Supplies</td>
                <td className="p-4">GST Mismatch</td>
                <td className="p-4"><span className="inline-flex px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">High</span></td>
                <td className="p-4 text-gray-500">2026-04-01</td>
                <td className="p-4"><button className="text-blue-600 hover:underline font-medium">Review</button></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-mono text-xs">ALT-8491</td>
                <td className="p-4 font-medium text-[#1A1D23]">Req #REQ-2026-089</td>
                <td className="p-4">Budget Exceeded (+15%)</td>
                <td className="p-4"><span className="inline-flex px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">Medium</span></td>
                <td className="p-4 text-gray-500">2026-03-30</td>
                <td className="p-4"><button className="text-blue-600 hover:underline font-medium">Review</button></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-mono text-xs">ALT-8490</td>
                <td className="p-4 font-medium text-[#1A1D23]">Metro Caterers</td>
                <td className="p-4">Missing Insurance Cert</td>
                <td className="p-4"><span className="inline-flex px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">Medium</span></td>
                <td className="p-4 text-gray-500">2026-03-28</td>
                <td className="p-4"><button className="text-blue-600 hover:underline font-medium">Review</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
