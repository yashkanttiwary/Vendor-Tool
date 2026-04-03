import React from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Shield, Award, TrendingDown, Info, Edit2 } from 'lucide-react';
import { PipelineBar } from '../components/PipelineBar';
import { mockRequest, formatCurrency } from '../data/mockData';
import { showToast } from '../components/Toast';

export const Recommendation: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1D23]">Recommendation</h1>
          <p className="text-gray-500 mt-1 font-mono text-sm">Request #{mockRequest.id}</p>
        </div>
      </div>

      <PipelineBar currentState="recommended" onNavigate={() => {}} />

      <div className="space-y-6 mb-8">
        {/* Top Pick */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-xs overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
          <div className="p-6 pl-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 uppercase tracking-wider mb-2">
                  <Award className="w-3.5 h-3.5 mr-1" /> Top Pick
                </span>
                <h2 className="text-lg font-bold text-[#1A1D23]">Sharma Furniture Co.</h2>
              </div>
              <div className="flex space-x-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                  HIGH CONFIDENCE
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> LOW RISK
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4 bg-[#F8F9FA] p-4 rounded-lg border border-gray-100">
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Score</div>
                <div className="text-xl font-mono font-bold text-[#1A1D23]">87/100</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Quote</div>
                <div className="text-xl font-mono font-bold text-[#1A1D23]">{formatCurrency(240000)}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Benchmark</div>
                <div className="text-sm font-medium text-amber-600 flex items-center mt-1">
                  At Mid (+4.3%)
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Savings</div>
                <div className="text-xl font-mono font-bold text-green-600 flex items-center">
                  <TrendingDown className="w-4 h-4 mr-1" /> {formatCurrency(60000)}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                Best balance of price, reliability, and delivery track record. Quote is at benchmark mid with strong delivery history across 3 prior PW orders.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <span>Evidence: 3 sources</span>
                <span>•</span>
                <span>Benchmark: At mid</span>
                <span>•</span>
                <span>2 quotes lower</span>
              </div>
              <span className="flex items-center text-blue-600 font-medium">
                <Info className="w-3.5 h-3.5 mr-1" /> AI-Assisted Rationale
              </span>
            </div>
          </div>
        </div>

        {/* Best Value */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-xs overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500"></div>
          <div className="p-6 pl-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 uppercase tracking-wider mb-2">
                  Best Value
                </span>
                <h2 className="text-lg font-bold text-[#1A1D23]">Regal Event Supplies</h2>
              </div>
              <div className="flex space-x-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <Shield className="w-3.5 h-3.5 mr-1" /> MEDIUM RISK
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Score</div>
                <div className="text-lg font-mono font-bold text-[#1A1D23]">82/100</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Quote</div>
                <div className="text-lg font-mono font-bold text-[#1A1D23]">{formatCurrency(210000)}</div>
              </div>
              <div className="col-span-2">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Why</div>
                <p className="text-sm text-gray-700">Lowest price, but moderate delivery risk due to limited capacity.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Safe */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-xs overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gray-400"></div>
          <div className="p-6 pl-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 uppercase tracking-wider mb-2">
                  Budget Safe
                </span>
                <h2 className="text-lg font-bold text-[#1A1D23]">Delhi Chair Mart</h2>
              </div>
              <div className="flex space-x-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> LOW RISK
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Score</div>
                <div className="text-lg font-mono font-bold text-[#1A1D23]">79/100</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Quote</div>
                <div className="text-lg font-mono font-bold text-[#1A1D23]">{formatCurrency(280000)}</div>
              </div>
              <div className="col-span-2">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Why</div>
                <p className="text-sm text-gray-700">Premium pricing but guaranteed on-time delivery with established SLA.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F8F9FA] rounded-lg border border-gray-200 p-6 mb-8 flex justify-between items-center">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Recommendation Basis</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-gray-800 mr-2"></span>
              <span className="font-medium mr-2">Deterministic:</span> Score, benchmark delta, risk calculation
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full border-2 border-blue-500 mr-2"></span>
              <span className="font-medium mr-2">AI-Assisted:</span> Explanation text, savings estimate
            </li>
          </ul>
        </div>
        <button 
          onClick={() => showToast('Edit Recommendation coming soon')}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md shadow-sm transition-colors"
        >
          <Edit2 className="w-4 h-4 mr-2" /> Edit Recommendation
        </button>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button 
          onClick={() => onNavigate('negotiation')}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Negotiation
        </button>
        <button 
          onClick={() => onNavigate('studio')}
          className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-md shadow-sm transition-colors"
        >
          Generate STUDIO Output <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};
