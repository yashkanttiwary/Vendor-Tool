import React, { useState, useRef } from 'react';
import { Package, Users, Calendar, PenTool, MonitorPlay, Printer, UploadCloud, ChevronDown, ChevronRight, File as FileIcon, X } from 'lucide-react';
import { sanitizeInput, isValidCity, isValidBudget, isValidTimeline } from '../utils/sanitize';

export const CommandConsole: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const [input, setInput] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = () => {
    setError('');
    
    // Basic validation
    if (!input.trim()) {
      setError('Please describe your need.');
      return;
    }
    
    // Validate optional fields even if advanced is closed
    if (budget && !isValidBudget(budget)) {
      setError('Budget contains invalid characters or is too long. Please use numbers and currency symbols.');
      setIsAdvancedOpen(true);
      return;
    }
    if (city && !isValidCity(city)) {
      setError('City contains invalid characters or is too long. Please use letters only.');
      setIsAdvancedOpen(true);
      return;
    }
    if (timeline && !isValidTimeline(timeline)) {
      setError('Timeline contains invalid characters or is too long.');
      setIsAdvancedOpen(true);
      return;
    }

    // Sanitize inputs before proceeding
    const sanitizedInput = sanitizeInput(input);
    const sanitizedCity = sanitizeInput(city);
    const sanitizedBudget = sanitizeInput(budget);
    const sanitizedTimeline = sanitizeInput(timeline);

    // In a real app, we would send these sanitized values to the backend
    // console.log({ sanitizedInput, sanitizedCity, sanitizedBudget, sanitizedTimeline, selectedFile });

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
            disabled={!input.trim()}
            className={`px-6 py-2.5 rounded-md font-medium text-sm transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              input.trim() 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Request <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <button 
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors bg-white border border-gray-200 shadow-sm px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="flex items-center">
            <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3">
              +
            </span>
            Add Structured Details (Category, City, Budget, Upload)
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isAdvancedOpen && (
          <div className="mt-4 p-6 bg-white rounded-lg border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              <div>
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
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Category Quick-Select</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-300 hover:bg-blue-50/50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#F8F9FA] group-hover:bg-white flex items-center justify-center mr-3 text-blue-600 transition-colors">
                <cat.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm text-[#1A1D23]">{cat.label}</span>
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
