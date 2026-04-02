import React from 'react';
import { X, MapPin, Phone, Mail, Globe, ShieldCheck, FileText, ExternalLink } from 'lucide-react';
import { formatCurrency } from '../data/mockData';

export const CandidateDetail: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#F8F9FA]">
          <div>
            <h2 className="text-xl font-bold text-[#1A1D23]">Sharma Furniture Co.</h2>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="w-3 h-3 mr-1" /> Lucknow, UP
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Contact Info</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center"><Phone className="w-4 h-4 mr-2 text-gray-400" /> +91 98765 43210</div>
                <div className="flex items-center"><Mail className="w-4 h-4 mr-2 text-gray-400" /> sales@sharmafurniture.in</div>
                <div className="flex items-center"><Globe className="w-4 h-4 mr-2 text-gray-400" /> www.sharmafurniture.in</div>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Profile</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between"><span className="text-gray-500">Capacity:</span> <span>1000 units/month</span></div>
                <div className="flex justify-between"><span className="text-gray-500">GST:</span> <span className="font-mono text-xs">09AAACS1234A1Z5</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Est:</span> <span>2015</span></div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Score Breakdown</h3>
            <div className="bg-[#F8F9FA] p-4 rounded-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-[#1A1D23]">Composite Score</span>
                <span className="text-2xl font-mono font-bold text-blue-600">87</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Price Fit', value: 82, weight: '30%' },
                  { label: 'Quality', value: 90, weight: '25%' },
                  { label: 'Reliability', value: 88, weight: '25%' },
                  { label: 'Relevance', value: 85, weight: '10%' },
                  { label: 'Risk Penalty', value: 92, weight: '10%' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">{item.label} <span className="text-gray-400 ml-1">({item.weight})</span></span>
                      <span className="font-mono font-medium text-[#1A1D23]">{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Pricing & Quote</h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <span className="text-sm font-medium text-[#1A1D23]">Total Quote</span>
                <span className="text-lg font-mono font-bold text-[#1A1D23]">{formatCurrency(240000)}</span>
              </div>
              <div className="p-4">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      <th className="pb-2 font-medium">Item</th>
                      <th className="pb-2 font-medium text-right">Qty</th>
                      <th className="pb-2 font-medium text-right">Unit Price</th>
                      <th className="pb-2 font-medium text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50">
                      <td className="py-2">Standard Office Chair</td>
                      <td className="py-2 text-right font-mono">500</td>
                      <td className="py-2 text-right font-mono">{formatCurrency(440)}</td>
                      <td className="py-2 text-right font-mono">{formatCurrency(220000)}</td>
                    </tr>
                    <tr>
                      <td className="py-2">Delivery & Setup</td>
                      <td className="py-2 text-right font-mono">1</td>
                      <td className="py-2 text-right font-mono">{formatCurrency(20000)}</td>
                      <td className="py-2 text-right font-mono">{formatCurrency(20000)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Source Evidence</h3>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-100 text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    IndiaMart
                  </span>
                  <a href="#" className="text-blue-600 hover:underline flex items-center text-xs">
                    View Listing <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
                <div className="text-gray-500 text-xs flex items-center mt-2">
                  <FileText className="w-3 h-3 mr-1" /> Extracted: 2026-03-28
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Risk Assessment</h3>
              <div className="bg-green-50 p-3 rounded-md border border-green-100 text-sm">
                <div className="flex items-center text-green-800 font-medium mb-2">
                  <ShieldCheck className="w-4 h-4 mr-2 text-green-600" /> Low Risk
                </div>
                <ul className="text-xs text-green-700 space-y-1 list-disc list-inside ml-4">
                  <li>Verified GST</li>
                  <li>3+ years in business</li>
                  <li>Positive IndiaMart reviews</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-[#F8F9FA] flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
