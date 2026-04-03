import React, { useState } from 'react';
import { Filter, ArrowUpDown, ChevronRight, ArrowLeft, ArrowRight, ShieldAlert, ShieldCheck, Shield, Search } from 'lucide-react';
import { PipelineBar } from '../components/PipelineBar';
import { mockRequest, mockCandidates, formatCurrency } from '../data/mockData';
import { showToast } from '../components/Toast';

export const Discovery: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [searchQuery, setSearchQuery] = useState('');

  const handleShortlistToggle = (id: string) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, shortlisted: !c.shortlisted } : c));
  };

  const getBenchmarkColor = (benchmark: string) => {
    switch (benchmark) {
      case 'low': return 'bg-green-500';
      case 'mid': return 'bg-amber-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <ShieldCheck className="w-4 h-4 text-green-500" />;
      case 'medium': return <Shield className="w-4 h-4 text-amber-500" />;
      case 'high': return <ShieldAlert className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1D23]">Discovery & Shortlist</h1>
          <p className="text-gray-500 mt-1 font-mono text-sm">Request #{mockRequest.id}</p>
        </div>
      </div>

      <PipelineBar currentState="shortlisted" onNavigate={() => {}} />

      <div className="bg-white rounded-lg border border-gray-100 shadow-xs overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100 bg-[#F1F3F5] flex justify-between items-center">
          <div className="flex items-center text-sm font-medium text-gray-600">
            <span className="text-[#1A1D23] font-bold mr-1">{filteredCandidates.length}</span> found
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-blue-600 font-bold mr-1">{candidates.filter(c => c.shortlisted).length}</span> shortlisted
          </div>
          <div className="flex space-x-4 items-center">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidates..." 
                className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-48"
              />
            </div>
            <button 
              onClick={() => showToast('Filter options coming soon')}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
            >
              <Filter className="w-4 h-4 mr-1" /> Filter
            </button>
            <button 
              onClick={() => showToast('Sort options coming soon')}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
            >
              <ArrowUpDown className="w-4 h-4 mr-1" /> Sort
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs uppercase tracking-wider text-gray-500 font-medium">
                <th className="px-6 py-3 w-12">#</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Score</th>
                <th className="px-6 py-3">Quote</th>
                <th className="px-6 py-3">Benchmark</th>
                <th className="px-6 py-3">Risk</th>
                <th className="px-6 py-3">Source</th>
                <th className="px-6 py-3 text-right">Shortlist</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate, index) => (
                  <tr 
                    key={candidate.id}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${candidate.shortlisted ? 'bg-blue-50/10' : ''}`}
                  >
                    <td className="px-6 py-4 font-mono text-gray-400 text-xs">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div 
                        className="font-medium text-[#1A1D23] flex items-center cursor-pointer hover:text-blue-600 transition-colors" 
                        onClick={() => showToast('Candidate details coming soon')}
                      >
                        {candidate.name} <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-[#1A1D23]">{candidate.score}</td>
                    <td className="px-6 py-4 font-mono text-[#1A1D23]">{formatCurrency(candidate.quote)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${getBenchmarkColor(candidate.benchmark)}`} />
                        <span className="capitalize text-xs font-medium text-gray-600">{candidate.benchmark}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center" title={`${candidate.risk} risk`}>
                        {getRiskIcon(candidate.risk)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        {candidate.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={candidate.shortlisted}
                          onChange={() => handleShortlistToggle(candidate.id)}
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No candidates found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button 
          onClick={() => onNavigate('parsed')}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Scope
        </button>
        <button 
          onClick={() => onNavigate('negotiation')}
          disabled={candidates.filter(c => c.shortlisted).length === 0}
          className={`flex items-center px-6 py-2.5 font-medium text-sm rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            candidates.filter(c => c.shortlisted).length > 0
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Proceed to Negotiation <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};
