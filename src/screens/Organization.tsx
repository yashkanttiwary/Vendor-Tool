import React, { useState } from 'react';
import { Users, Building, Shield, X, Mail } from 'lucide-react';
import { showToast } from '../components/Toast';
import { useLocalStorage } from '../utils/useLocalStorage';

export const Organization: React.FC = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Viewer');
  const [inviteDepartment, setInviteDepartment] = useState('Operations');

  const [teamMembers, setTeamMembers] = useLocalStorage('genie-us-team', [
    { id: 1, name: 'Amit Sharma', email: 'amit@example.com', role: 'Finance Controller', department: 'Finance', status: 'Active' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', role: 'Procurement Manager', department: 'Operations', status: 'Active' },
    { id: 3, name: 'Rahul Desai', email: 'rahul@example.com', role: 'Operations Lead', department: 'Operations', status: 'Offline' },
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) {
      showToast('Please enter an email address');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail)) {
      showToast('Please enter a valid email address');
      return;
    }

    const newMember = {
      id: Date.now(),
      name: inviteEmail.split('@')[0], // Use part of email as name for now
      email: inviteEmail,
      role: inviteRole,
      department: inviteDepartment,
      status: 'Pending'
    };

    setTeamMembers([...teamMembers, newMember]);

    // Simulate API call
    showToast(`Invitation sent to ${inviteEmail}`);
    setIsInviteModalOpen(false);
    setInviteEmail('');
  };

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
            onClick={() => setIsInviteModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
              {teamMembers.map((member: any) => (
                <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium text-[#1A1D23]">{member.name}</td>
                  <td className="p-4">{member.role}</td>
                  <td className="p-4">{member.department}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      member.status === 'Active' ? 'bg-green-100 text-green-800' :
                      member.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#1A1D23]">Invite New Member</h3>
              <button 
                onClick={() => setIsInviteModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleInvite} className="p-6 space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="colleague@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  id="role"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option>Admin</option>
                  <option>Procurement Manager</option>
                  <option>Finance Controller</option>
                  <option>Operations Lead</option>
                  <option>Viewer</option>
                </select>
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  id="department"
                  value={inviteDepartment}
                  onChange={(e) => setInviteDepartment(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option>Finance</option>
                  <option>Operations</option>
                  <option>IT</option>
                  <option>HR</option>
                  <option>Marketing</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
