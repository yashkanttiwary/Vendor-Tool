import React from 'react';
import { Settings as SettingsIcon, Bell, Lock, Globe } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1D23]">Settings</h1>
        <p className="text-gray-500 mt-2 text-lg">Configure your GENIE-US workspace preferences.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center">
            <SettingsIcon className="w-5 h-5 text-gray-500 mr-3" />
            <h2 className="text-lg font-bold text-[#1A1D23]">General Preferences</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-[#1A1D23]">Default Currency</h3>
                <p className="text-xs text-gray-500">Set the default currency for all modules.</p>
              </div>
              <select className="border border-gray-300 rounded-md text-sm p-2 bg-white">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div>
                <h3 className="text-sm font-medium text-[#1A1D23]">Language</h3>
                <p className="text-xs text-gray-500">Interface language.</p>
              </div>
              <select className="border border-gray-300 rounded-md text-sm p-2 bg-white">
                <option>English (UK)</option>
                <option>English (US)</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center">
            <Bell className="w-5 h-5 text-gray-500 mr-3" />
            <h2 className="text-lg font-bold text-[#1A1D23]">Notifications</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-[#1A1D23]">Email Alerts</h3>
                <p className="text-xs text-gray-500">Receive updates on request status changes.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
