import React from 'react';
import { CheckCircle2, AlertTriangle, Edit2, ArrowRight, ArrowLeft } from 'lucide-react';
import { PipelineBar } from '../components/PipelineBar';
import { mockRequest, formatCurrency } from '../data/mockData';

export const ParsedScope: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1D23]">Request #{mockRequest.id}</h1>
          <p className="text-gray-500 mt-1">Review and confirm structured scope</p>
        </div>
      </div>

      <PipelineBar currentState="parsed" onNavigate={() => {}} />

      <div className="bg-white rounded-lg border border-gray-100 shadow-xs mb-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-[#F1F3F5] flex justify-between items-center">
          <h2 className="text-sm font-semibold text-[#1A1D23] uppercase tracking-wider">Structured Scope</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors">
            <Edit2 className="w-4 h-4 mr-1" /> Edit Scope
          </button>
        </div>
        
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <tbody className="text-sm">
              <tr className="border-b border-gray-50">
                <td className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-gray-500 w-1/3">Category</td>
                <td className="px-6 py-4 font-medium text-[#1A1D23] flex items-center justify-between">
                  {mockRequest.category}
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-gray-500">City / Location</td>
                <td className="px-6 py-4 font-medium text-[#1A1D23] flex items-center justify-between">
                  {mockRequest.city}
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-gray-500">Budget</td>
                <td className="px-6 py-4 font-mono font-medium text-[#1A1D23] flex items-center justify-between">
                  {formatCurrency(mockRequest.budget)}
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-gray-500">Timeline</td>
                <td className="px-6 py-4 font-medium text-[#1A1D23] flex items-center justify-between">
                  {mockRequest.timeline}
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-gray-500">Services</td>
                <td className="px-6 py-4 font-medium text-[#1A1D23] flex items-center justify-between">
                  {mockRequest.services}
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-gray-500">Quantity</td>
                <td className="px-6 py-4 font-mono font-medium text-[#1A1D23] flex items-center justify-between">
                  {mockRequest.quantity}
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-amber-50/30 rounded-lg border border-amber-100 shadow-xs p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#1A1D23] uppercase tracking-wider">Assumptions (AI-Inferred)</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Confidence: HIGH
            </span>
          </div>
          <ul className="space-y-3">
            {mockRequest.assumptions.map(assumption => (
              <li key={assumption.id} className="flex items-start justify-between text-sm text-gray-700 bg-white p-3 rounded-md border border-amber-50 shadow-xs">
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                  {assumption.text}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors">Edit</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-50/30 rounded-lg border border-red-100 shadow-xs p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#1A1D23] uppercase tracking-wider flex items-center">
              <AlertTriangle className="w-4 h-4 text-amber-500 mr-2" /> Needs Review
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              ⚠ 1 item
            </span>
          </div>
          <ul className="space-y-3">
            {mockRequest.needsReview.map(item => (
              <li key={item.id} className="flex items-start justify-between text-sm text-gray-700 bg-white p-3 rounded-md border border-red-50 shadow-xs">
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                  {item.text}
                </span>
                <button className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-medium rounded-md transition-colors">Resolve</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button 
          onClick={() => onNavigate('command_console')}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Edit Request
        </button>
        <button 
          onClick={() => onNavigate('discovery')}
          className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-md shadow-sm transition-colors"
        >
          Proceed to Discovery <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};
