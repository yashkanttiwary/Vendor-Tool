import React from 'react';
import { TrendingUp, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { formatCurrency } from '../data/mockData';

export const Workspace: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
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
            <div className="text-3xl font-mono font-bold text-[#1A1D23]">12</div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" /> +2
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
            onClick={() => onNavigate('command_console')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
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
              <tr 
                className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onNavigate('parsed_scope')}
              >
                <td className="px-6 py-4 font-mono text-[#1A1D23]">GU-0142</td>
                <td className="px-6 py-4 text-gray-700">Vendor Procurement</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5 animate-pulse"></span>
                    Negotiation
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-[#1A1D23]">{formatCurrency(240000)}</td>
                <td className="px-6 py-4 text-gray-500 font-mono text-xs">2h ago</td>
              </tr>
              <tr className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors">
                <td className="px-6 py-4 font-mono text-[#1A1D23]">GU-0139</td>
                <td className="px-6 py-4 text-gray-700">Influencer Sourcing</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
                    Approval
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-[#1A1D23]">{formatCurrency(180000)}</td>
                <td className="px-6 py-4 text-gray-500 font-mono text-xs">5h ago</td>
              </tr>
              <tr className="hover:bg-gray-50 cursor-pointer transition-colors">
                <td className="px-6 py-4 font-mono text-[#1A1D23]">GU-0135</td>
                <td className="px-6 py-4 text-gray-700">Event Sourcing</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5"></span>
                    Done
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-[#1A1D23]">{formatCurrency(520000)}</td>
                <td className="px-6 py-4 text-gray-500 font-mono text-xs">1d ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
