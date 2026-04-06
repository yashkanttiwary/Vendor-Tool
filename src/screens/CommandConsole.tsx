import React, { useState, useRef } from 'react';
import { Package, Users, Calendar, PenTool, MonitorPlay, Printer, UploadCloud, ChevronDown, ChevronRight, File as FileIcon, X, CheckCircle2 } from 'lucide-react';
import { sanitizeInput, isValidCity, isValidBudget, isValidTimeline } from '../utils/sanitize';
import { useLocalStorage } from '../utils/useLocalStorage';
import { addAuditLog } from '../utils/auditLogger';
import { buildExecutionBrief, generateCandidates, generateRecommendationTiers, parseMoney, parseQuantity } from '../utils/genieEngine';
import { upsertRequestRecord } from '../utils/requestStore';
import { aiDiscoverCandidates, aiParseScope, aiRecommend } from '../utils/aiClient';

export const CommandConsole: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [requests, setRequests] = useLocalStorage('genie-us-requests', []);

  const categories = [
    { id: 'vendor', label: 'Vendor', icon: Package },
    { id: 'influencer', label: 'Influencer', icon: Users },
    { id: 'event', label: 'Event', icon: Calendar },
    { id: 'freelancer', label: 'Freelancer', icon: PenTool },
    { id: 'media', label: 'Media', icon: MonitorPlay },
    { id: 'print', label: 'Print', icon: Printer },
  ];

  const examples = [
    "500 chairs for Lucknow center, budget ₹3L, need in 2 weeks",
    "10 NEET influencers, 50K-500K followers, budget ₹5L",
    "200-seat seminar in Jaipur, March 28, with AV and catering"
  ];

  const handleSubmit = async () => {
    setError('');
    
    // Basic validation
    if (!input.trim() && !category && !city && !budget && !timeline) {
      setError('Please describe your need or fill in the structured details.');
      return;
    }
    
    if (/<|>/g.test(input) || /<|>/g.test(category) || /<|>/g.test(city) || /<|>/g.test(budget) || /<|>/g.test(timeline)) {
      setError('Input contains invalid characters (< or >). Please remove them.');
      return;
    }
    
    // Validate optional fields even if advanced is closed
    if (budget && !isValidBudget(budget)) {
      setError('Budget contains invalid characters or is too long. Please use numbers and currency symbols.');
      return;
    }
    if (city && !isValidCity(city)) {
      setError('City contains invalid characters or is too long. Please use letters only.');
      return;
    }
    if (timeline && !isValidTimeline(timeline)) {
      setError('Timeline contains invalid characters or is too long.');
      return;
    }

    // Sanitize inputs before proceeding
    const sanitizedInput = sanitizeInput(input);
    const sanitizedCategory = sanitizeInput(category);
    const sanitizedCity = sanitizeInput(city);
    const sanitizedBudget = sanitizeInput(budget);
    const sanitizedTimeline = sanitizeInput(timeline);

    // In a real app, we would send these sanitized values to the backend
    // console.log({ sanitizedInput, sanitizedCategory, sanitizedCity, sanitizedBudget, sanitizedTimeline, selectedFile });

    // Simulate AI extraction if fields are empty
    let extractedCity = sanitizedCity;
    let extractedBudget = sanitizedBudget;
    let extractedTimeline = sanitizedTimeline;
    let extractedQuantity = "TBD";
    let extractedServices = "General Request";

    if (sanitizedInput) {
      const lowerInput = sanitizedInput.toLowerCase();
      if (!extractedCity) {
        const cities = ['lucknow', 'bengaluru', 'mumbai', 'delhi', 'jaipur', 'pune', 'hyderabad', 'chennai'];
        const foundCity = cities.find(c => lowerInput.includes(c));
        if (foundCity) extractedCity = foundCity.charAt(0).toUpperCase() + foundCity.slice(1);
      }
      if (!extractedBudget) {
        const budgetMatch = sanitizedInput.match(/₹\s*([0-9.,]+[kKlLmM]?)/i) || sanitizedInput.match(/budget\s*(?:of)?\s*([0-9.,]+[kKlLmM]?)/i);
        if (budgetMatch) extractedBudget = budgetMatch[1];
      }
      if (!extractedTimeline) {
        const timelineMatch = sanitizedInput.match(/([0-9]+)\s*(week|month|day)s?/i);
        if (timelineMatch) extractedTimeline = `${timelineMatch[1]} ${timelineMatch[2]}s`;
      }
      
      const quantityMatch = sanitizedInput.match(/([0-9]+)\s*(chairs|units|people|influencers|seats)/i);
      if (quantityMatch) extractedQuantity = `${quantityMatch[1]} ${quantityMatch[2]}`;
      
      extractedServices = sanitizedInput.length > 30 ? sanitizedInput.substring(0, 30) + '...' : sanitizedInput;
    }

    if (sanitizedInput) {
      const parsedPayload = await aiParseScope(sanitizedInput);
      const parsed = parsedPayload?.parsed || {};
      extractedCity = parsed.city || extractedCity;
      extractedBudget = parsed.budget || extractedBudget;
      extractedTimeline = parsed.timeline || extractedTimeline;
      extractedQuantity = parsed.quantity || extractedQuantity;
      extractedServices = parsed.services || extractedServices;
    }

    const newRequestId = `GU-${Date.now().toString().slice(-6)}`;
    const normalizedBudget = parseMoney(extractedBudget || sanitizedBudget || 0);
    const normalizedQuantity = parseQuantity(extractedQuantity);

    const seededRequest = {
      id: newRequestId,
      category: sanitizedCategory || 'General Sourcing',
      city: extractedCity || 'Unspecified',
      budget: normalizedBudget,
      timeline: extractedTimeline || 'Unspecified',
      quantity: normalizedQuantity,
      services: extractedServices,
      status: 'Parsed',
      quote: normalizedBudget,
      updated: new Date().toISOString(),
      navigate: 'parsed'
    };

    const aiDiscovery = await aiDiscoverCandidates(seededRequest);
    const candidates = (aiDiscovery?.candidates?.length ? aiDiscovery.candidates : generateCandidates(seededRequest)).map((c: any, idx: number) => ({
      id: c.id || `${seededRequest.id}-v${idx + 1}`,
      shortlisted: c.shortlisted ?? idx < 4,
      ...c,
    }));

    const aiRecommendation = await aiRecommend(seededRequest, candidates);
    const recommendationTiers = aiRecommendation?.recommendationTiers?.length ? aiRecommendation.recommendationTiers : generateRecommendationTiers(candidates, normalizedBudget);
    const selectedVendorId = recommendationTiers[0]?.vendorId;
    const selectedVendor = candidates.find((c) => c.id === selectedVendorId);

    const currentRequest = {
      ...seededRequest,
      candidates,
      recommendationTiers,
      selectedVendorId,
      negotiationTarget: selectedVendor ? Math.round(selectedVendor.quote * 0.92) : undefined,
      brief: buildExecutionBrief({ ...seededRequest, candidates, recommendationTiers } as any, selectedVendor),
      savings: selectedVendor ? Math.max(0, normalizedBudget - selectedVendor.quote) : 0,
    };

    const requestListItem = {
      id: currentRequest.id,
      category: currentRequest.category,
      status: currentRequest.status,
      quote: currentRequest.quote,
      updated: currentRequest.updated,
      navigate: currentRequest.navigate,
      savings: currentRequest.savings,
    };

    setRequests([requestListItem, ...requests]);
    addAuditLog('Request Created', `Created request ${newRequestId} via Command Console`);

    window.localStorage.setItem('genie-us-current-request', JSON.stringify(currentRequest));
    upsertRequestRecord(currentRequest as any);

    onNavigate('parsed');
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleCategorySelect = (catId: string, catLabel: string) => {
    setCategory(catLabel);
    if (!input.includes(catLabel)) {
      setInput(prev => prev ? `${prev} [${catLabel}]` : `Looking for ${catLabel}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1D23]">Start a Sourcing Request</h1>
        <p className="text-gray-500 mt-1">Describe your need in natural language or use structured fields.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-xs p-6 mb-8">
        <div className="mb-4">
          <label htmlFor="sourcing-input" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            What do you need sourced?
          </label>
          <textarea
            id="sourcing-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your need in natural language..."
            className="w-full min-h-[120px] p-4 bg-[#F8F9FA] border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors resize-y text-[#1A1D23] outline-none"
          />
        </div>
        
        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100" role="alert">{error}</div>}
        
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!input.trim() && !category && !city && !budget && !timeline}
            className={`px-6 py-2.5 rounded-md font-medium text-sm transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              input.trim() || category || city || budget || timeline
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Request <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
          <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-2 text-xs">
            +
          </span>
          Optional Structured Details
        </h3>
        
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="category-input" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                <select
                  id="category-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 bg-[#F8F9FA] border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.label}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="city-input" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">City</label>
                <input 
                  id="city-input"
                  type="text" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 bg-[#F8F9FA] border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-colors" 
                  placeholder="e.g. Lucknow" 
                />
              </div>
              <div>
                <label htmlFor="budget-input" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Budget</label>
                <input 
                  id="budget-input"
                  type="text" 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-3 bg-[#F8F9FA] border border-gray-200 rounded-md text-sm font-mono focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-colors" 
                  placeholder="₹" 
                />
              </div>
              <div>
                <label htmlFor="timeline-input" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Timeline</label>
                <input 
                  id="timeline-input"
                  type="text" 
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full p-3 bg-[#F8F9FA] border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-colors" 
                  placeholder="e.g. 2 weeks" 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Supporting Documents</label>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                {!selectedFile ? (
                  <div 
                    onClick={handleFileUpload}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full p-4 border-2 border-dashed rounded-md text-sm flex flex-col items-center justify-center cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-[#F8F9FA] hover:bg-gray-50'
                    }`}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleFileUpload()}
                  >
                    <UploadCloud className={`w-6 h-6 mb-2 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} /> 
                    <span className="text-gray-600 font-medium">Click to upload or drag and drop</span>
                    <span className="text-gray-400 text-xs mt-1">PDF, DOCX, XLSX up to 10MB</span>
                  </div>
                ) : (
                  <div className="w-full p-3 bg-blue-50 border border-blue-100 rounded-md flex items-center justify-between">
                    <div className="flex items-center overflow-hidden">
                      <FileIcon className="w-5 h-5 text-blue-600 mr-2 shrink-0" />
                      <span className="text-sm font-medium text-blue-900 truncate">{selectedFile.name}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedFile(null)}
                      className="p-1 hover:bg-blue-100 rounded-full text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Category Quick-Select</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id, cat.label)}
              className={`flex items-center p-4 border rounded-lg shadow-sm transition-all text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 group ${
                category === cat.label 
                  ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-500' 
                  : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 transition-colors ${
                category === cat.label ? 'bg-blue-100 text-blue-700' : 'bg-[#F8F9FA] group-hover:bg-white text-blue-600'
              }`}>
                <cat.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm text-[#1A1D23] flex-1">{cat.label}</span>
              {category === cat.label && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Example Prompts</h3>
        <div className="flex flex-wrap gap-2">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setInput(ex)}
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm rounded-full transition-colors border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              "{ex}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
