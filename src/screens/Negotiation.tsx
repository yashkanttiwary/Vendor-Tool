import React from 'react';
import { ArrowLeft, ArrowRight, MessageSquare, Mail, TrendingDown, Info } from 'lucide-react';
import { PipelineBar } from '../components/PipelineBar';
import { mockRequest, formatCurrency } from '../data/mockData';

export const Negotiation: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1D23]">Negotiation Strategy</h1>
          <p className="text-gray-500 mt-1 font-mono text-sm">Request #{mockRequest.id}</p>
        </div>
      </div>

      <PipelineBar currentState="negotiation_ready" onNavigate={() => {}} />

      <div className="bg-white rounded-lg border border-gray-100 shadow-xs mb-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-[#F1F3F5] flex justify-between items-center">
          <h2 className="text-sm font-semibold text-[#1A1D23] uppercase tracking-wider">Sharma Furniture Co.</h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Top Candidate
          </span>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="col-span-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Benchmark Comparison</h3>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm font-medium text-[#1A1D23] mb-2">
                  <span>Current Quote</span>
                  <span className="font-mono text-xl">{formatCurrency(240000)}</span>
                </div>
                
                <div className="relative pt-8 pb-12">
                  {/* Benchmark Bar */}
                  <div className="h-3 bg-gray-100 rounded-full flex overflow-hidden">
                    <div className="h-full bg-green-400" style={{ width: '30%' }}></div>
                    <div className="h-full bg-amber-400" style={{ width: '40%' }}></div>
                    <div className="h-full bg-red-400" style={{ width: '30%' }}></div>
                  </div>
                  
                  {/* Markers */}
                  <div className="absolute top-12 left-[30%] -translate-x-1/2 text-center">
                    <div className="w-0.5 h-3 bg-gray-400 mx-auto mb-1"></div>
                    <div className="text-xs text-gray-500 font-medium">Low</div>
                    <div className="text-xs font-mono text-gray-400">{formatCurrency(190000)}</div>
                  </div>
                  
                  <div className="absolute top-12 left-[50%] -translate-x-1/2 text-center">
                    <div className="w-0.5 h-3 bg-gray-600 mx-auto mb-1"></div>
                    <div className="text-xs text-gray-700 font-bold">Mid</div>
                    <div className="text-xs font-mono text-gray-600">{formatCurrency(230000)}</div>
                  </div>
                  
                  <div className="absolute top-12 left-[70%] -translate-x-1/2 text-center">
                    <div className="w-0.5 h-3 bg-gray-400 mx-auto mb-1"></div>
                    <div className="text-xs text-gray-500 font-medium">High</div>
                    <div className="text-xs font-mono text-gray-400">{formatCurrency(280000)}</div>
                  </div>
                  
                  {/* Quote Position */}
                  <div className="absolute top-0 left-[55%] -translate-x-1/2 flex flex-col items-center">
                    <div className="bg-[#1A1D23] text-white text-xs font-mono px-2 py-1 rounded shadow-sm mb-1 whitespace-nowrap">
                      Quote: {formatCurrency(240000)}
                    </div>
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-[#1A1D23]"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#F8F9FA] p-5 rounded-lg border border-gray-100 flex flex-col justify-center">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Negotiation Targets</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Target Quote</span>
                  <span className="text-lg font-mono font-bold text-[#1A1D23]">{formatCurrency(220000)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Expected Savings</span>
                  <span className="text-lg font-mono font-bold text-green-600 flex items-center">
                    <TrendingDown className="w-4 h-4 mr-1" /> {formatCurrency(20000)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Potential</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    8.3%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Rationale</h3>
              <ul className="space-y-2">
                {[
                  "Quote is 4.3% above benchmark mid",
                  "2 competitors quoting lower (₹2.1L - ₹2.35L)",
                  "Vendor has strong delivery record, worth pushing on price",
                  "Volume leverage (500 units) justifies 5-8% discount"
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 mr-2 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 flex items-center text-xs text-gray-500 bg-blue-50 p-3 rounded-md border border-blue-100">
                <Info className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
                <span>This rationale is AI-assisted based on benchmark data and competitor quotes.</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Suggested Ask</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs relative">
                <div className="absolute -left-2 top-4 w-1 h-8 bg-blue-500 rounded-r-md"></div>
                <p className="text-sm text-gray-800 italic font-medium leading-relaxed">
                  "Hi Sharma Furniture team, thanks for the quote of ₹2.4L for 500 chairs. We have competitive quotes in the ₹2.1L–₹2.3L range. Given our volume, can you match ₹2.2L with the same delivery terms?"
                </p>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-3">
                  <button className="flex-1 flex justify-center items-center px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-medium rounded-md transition-colors shadow-sm">
                    <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Draft
                  </button>
                  <button className="flex-1 flex justify-center items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md transition-colors shadow-sm">
                    <Mail className="w-4 h-4 mr-2" /> Email Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button 
          onClick={() => onNavigate('discovery')}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shortlist
        </button>
        <button 
          onClick={() => onNavigate('recommendation')}
          className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-md shadow-sm transition-colors"
        >
          Proceed to Recommendation <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};
