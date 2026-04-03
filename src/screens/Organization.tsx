import React from 'react';
import { Users, Building, Shield } from 'lucide-react';
import { showToast } from '../components/Toast';

export const Organization: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1D23]">Organization</h1>
        <p className="text-gray-500 mt-2 text-lg">Manage team members, roles, and permissions.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1A1D23]">Team Members</h2>
          <button 
            onClick={() => showToast('Invite Member coming soon')}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Invite Member
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Name</th>
                <th className="p-4">Role</th>
                <th className="p-4">Department</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium text-[#1A1D23]">Amit Sharma</td>
                <td className="p-4">Finance Controller</td>
                <td className="p-4">Finance</td>
                <td className="p-4"><span className="inline-flex px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium text-[#1A1D23]">Priya Patel</td>
                <td className="p-4">Procurement Manager</td>
                <td className="p-4">Operations</td>
                <td className="p-4"><span className="inline-flex px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium text-[#1A1D23]">Rahul Desai</td>
                <td className="p-4">Operations Lead</td>
                <td className="p-4">Operations</td>
                <td className="p-4"><span className="inline-flex px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Offline</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
