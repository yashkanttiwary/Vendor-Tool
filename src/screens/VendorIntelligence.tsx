import React, { useState } from 'react';
import { Search, Star, TrendingUp, AlertCircle, MapPin, Globe, Shield } from 'lucide-react';
import { showToast } from '../components/Toast';
import { addAuditLog } from '../utils/auditLogger';

export const VendorIntelligence: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const vendors = [
    { name: 'Sharma Furniture Co.', category: 'Office Supplies', rating: 4.8, risk: 'Low', location: 'Mumbai, India', spend: '₹1.2M' },
    { name: 'TechCorp Solutions', category: 'IT Services', rating: 4.5, risk: 'Medium', location: 'Bangalore, India', spend: '₹4.5M' },
    { name: 'Global Logistics Inc.', category: 'Logistics', rating: 3.9, risk: 'High', location: 'Delhi, India', spend: '₹800K' },
    { name: 'Apex Marketing', category: 'Marketing', rating: 4.2, risk: 'Low', location: 'Pune, India', spend: '₹2.1M' },
  ];

  const filteredVendors = vendors.filter(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.category.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleVendorClick = (vendorName: string) => {
    showToast(`Viewing details for ${vendorName}`);
    addAuditLog('Vendor Details Viewed', `User viewed details for vendor: ${vendorName}`);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1D23]">Vendor Intelligence</h1>
          <p className="text-gray-500 mt-2 text-lg">Deep dive into vendor performance and history.</p>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vendors..." 
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Vendors</h3>
            <Globe className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">142</p>
          <p className="text-xs text-green-600 mt-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +12 this year</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg Performance</h3>
            <Star className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">4.2 / 5.0</p>
          <p className="text-xs text-gray-500 mt-1">Based on 850 reviews</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">High Risk Vendors</h3>
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">8</p>
          <p className="text-xs text-red-600 mt-1 flex items-center">Requires attention</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Compliant Vendors</h3>
            <Shield className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">94%</p>
          <p className="text-xs text-green-600 mt-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +2% from last quarter</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs uppercase tracking-wider text-gray-500 font-medium">
                <th className="px-6 py-4">Vendor Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Risk Level</th>
                <th className="px-6 py-4 text-right">YTD Spend</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {filteredVendors.map((vendor, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleVendorClick(vendor.name)}>
                  <td className="px-6 py-4 font-medium text-gray-900">{vendor.name}</td>
                  <td className="px-6 py-4 text-gray-600">{vendor.category}</td>
                  <td className="px-6 py-4 text-gray-600 flex items-center"><MapPin className="w-3 h-3 mr-1 text-gray-400" /> {vendor.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-400 fill-current mr-1" />
                      <span className="font-medium text-gray-900">{vendor.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      vendor.risk === 'Low' ? 'bg-green-100 text-green-800' :
                      vendor.risk === 'Medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {vendor.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-gray-900">{vendor.spend}</td>
                </tr>
              ))}
              {filteredVendors.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No vendors found matching your search.
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
