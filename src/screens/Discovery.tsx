import React, { useEffect, useMemo, useState } from 'react';
import { Search, ArrowLeft, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { PipelineBar } from '../components/PipelineBar';
import { formatCurrency, mockRequest } from '../data/mockData';
import { CandidateDetail } from './CandidateDetail';
import { addAuditLog } from '../utils/auditLogger';
import { Candidate, generateRecommendationTiers } from '../utils/genieEngine';
import { aiResearch } from '../utils/aiClient';
import { updateRequestState } from '../utils/requestManager';
import { upsertRequestRecord } from '../utils/requestStore';

export const Discovery: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const [currentRequest, setCurrentRequest] = useState<any>(mockRequest);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [research, setResearch] = useState<any[]>([]);
  const [researching, setResearching] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('genie-us-current-request');
    if (stored) {
      const parsed = JSON.parse(stored);
      setCurrentRequest({ ...mockRequest, ...parsed });
      setCandidates(parsed.candidates || []);
    }
  }, []);

  const filtered = useMemo(() => candidates.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())), [candidates, searchQuery]);

  const persist = (nextCandidates: Candidate[]) => {
    const recommendationTiers = generateRecommendationTiers(nextCandidates, currentRequest.budget || 0);
    const nextRequest = { ...currentRequest, candidates: nextCandidates, recommendationTiers };
    setCurrentRequest(nextRequest);
    window.localStorage.setItem('genie-us-current-request', JSON.stringify(nextRequest));
    upsertRequestRecord(nextRequest as any);
  };

  const toggleShortlist = (id: string) => {
    const next = candidates.map((c) => (c.id === id ? { ...c, shortlisted: !c.shortlisted } : c));
    setCandidates(next);
    persist(next);
    addAuditLog('Shortlist Updated', `Updated shortlist for ${currentRequest.id}`);
  };

  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId);

  const mapUrl = (name: string) => `https://www.google.com/maps/search/${encodeURIComponent(`${name} ${currentRequest.city || ''}`)}`;

  const runResearch = async () => {
    setResearching(true);
    const result = await aiResearch({
      city: currentRequest.city,
      category: currentRequest.category,
      services: currentRequest.services,
      quantity: currentRequest.quantity,
      budget: currentRequest.budget,
    });
    setResearch(result?.vendorResearch || []);
    setResearching(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">Discovery & Shortlist</h1>
      <p className="text-sm text-gray-500 font-mono">Request #{currentRequest.id}</p>
      <PipelineBar currentState="shortlisted" onNavigate={() => {}} />

      <div className="mt-4 flex justify-end">
        <button onClick={runResearch} disabled={researching} className={`inline-flex items-center px-3 py-2 text-sm rounded-md border ${researching ? 'bg-gray-100 text-gray-500' : 'bg-white hover:bg-gray-50 text-blue-700 border-blue-200'}`}>
          <Sparkles className="w-4 h-4 mr-1" /> {researching ? 'Researching...' : 'Run AI Vendor Research'}
        </button>
      </div>

      <div className="bg-white border rounded-lg mt-6 overflow-hidden">
        {!candidates.length && <div className="p-4 text-sm text-amber-700 bg-amber-50 border-b">No generated candidates found for this request yet. Go back and resubmit or edit scope.</div>}
        <div className="p-4 border-b flex items-center justify-between">
          <div>{filtered.length} found • {candidates.filter((c) => c.shortlisted).length} shortlisted</div>
          <div className="relative">
            <Search className="w-4 h-4 absolute top-2.5 left-2 text-gray-400" />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-8 pr-3 py-1.5 border rounded" placeholder="Search vendors" />
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr><th className="p-3">Name</th><th>Score</th><th>Quote</th><th>Risk</th><th>Map</th><th>Shortlist</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.name}<div className="text-xs text-gray-500">{c.source}</div></td>
                <td>{c.score}</td><td>{formatCurrency(c.quote)}</td><td>{c.risk}</td>
                <td><a className="text-blue-600 inline-flex items-center" href={mapUrl(c.name)} target="_blank" rel="noreferrer">Map <ExternalLink className="w-3 h-3 ml-1"/></a></td>
                <td><input type="checkbox" checked={c.shortlisted} onChange={() => toggleShortlist(c.id)} /></td>
                <td><button onClick={() => setSelectedCandidateId(c.id)} className="text-blue-600">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {research.length > 0 && (
        <div className="bg-white border rounded-lg mt-6 p-4">
          <h3 className="text-sm font-semibold mb-3">AI Research Results (Web + Map Intent)</h3>
          <ul className="space-y-2 text-sm">
            {research.map((item, idx) => (
              <li key={idx} className="border rounded p-3 bg-gray-50">
                <div className="font-medium text-[#1A1D23]">{item.name || `Vendor ${idx + 1}`}</div>
                <div className="text-gray-600">{item.reason || 'AI-discovered option based on request scope.'}</div>
                <div className="mt-1 flex gap-3">
                  <a href={mapUrl(item.name || `Vendor ${idx + 1}`)} target="_blank" rel="noreferrer" className="text-blue-600 inline-flex items-center">Google Maps <ExternalLink className="w-3 h-3 ml-1" /></a>
                  <a href={`https://www.indiamart.com/search.mp?ss=${encodeURIComponent(`${item.name || ''} ${currentRequest.city || ''}`)}`} target="_blank" rel="noreferrer" className="text-blue-600 inline-flex items-center">IndiaMART <ExternalLink className="w-3 h-3 ml-1" /></a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button className="flex items-center" onClick={() => onNavigate('parsed')}><ArrowLeft className="w-4 h-4 mr-1" />Back</button>
        <button
          disabled={!candidates.length}
          className={`flex items-center px-4 py-2 rounded ${candidates.length ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          onClick={() => {
            updateRequestState(currentRequest.id, 'Negotiation', 'negotiation');
            const next = { ...currentRequest, status: 'Negotiation', navigate: 'negotiation', candidates };
            window.localStorage.setItem('genie-us-current-request', JSON.stringify(next));
            upsertRequestRecord(next as any);
            onNavigate('negotiation');
          }}
        >Continue<ArrowRight className="w-4 h-4 ml-1" /></button>
      </div>

      {selectedCandidate && <CandidateDetail candidate={selectedCandidate} city={currentRequest.city} onClose={() => setSelectedCandidateId(null)} />}
    </div>
  );
};
