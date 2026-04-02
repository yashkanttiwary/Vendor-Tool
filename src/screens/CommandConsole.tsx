import React, { useState } from 'react';
import { Package, Users, Calendar, PenTool, MonitorPlay, Printer, UploadCloud, ChevronDown, ChevronRight } from 'lucide-react';

export const CommandConsole: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const [input, setInput] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1D23]">Start a Sourcing Request</h1>
        <p className="text-gray-500 mt-1">Describe your need in natural language or use structured fields.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-xs p-6 mb-8">
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            What do you need sourced?
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your need in natural language..."
            className="w-full min-h-[120px] p-4 bg-[#F8F9FA] border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-y text-[#1A1D23]"
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={() => onNavigate('parsed_scope')}
            disabled={!input.trim()}
            className={`px-6 py-2.5 rounded-md font-medium text-sm transition-colors flex items-center ${
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
          className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronDown className={`w-4 h-4 mr-1 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
          Optional: Category · City · Budget · Upload
        </button>
        
        {isAdvancedOpen && (
          <div className="mt-4 p-6 bg-[#F1F3F5] rounded-lg border border-gray-200/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">City</label>
                <input type="text" className="w-full p-2 bg-white border border-gray-200 rounded-md text-sm" placeholder="e.g. Lucknow" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Budget</label>
                <input type="text" className="w-full p-2 bg-white border border-gray-200 rounded-md text-sm font-mono" placeholder="₹" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Timeline</label>
                <input type="text" className="w-full p-2 bg-white border border-gray-200 rounded-md text-sm" placeholder="e.g. 2 weeks" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Files</label>
                <button className="w-full p-2 bg-white border border-gray-200 border-dashed rounded-md text-sm text-gray-500 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <UploadCloud className="w-4 h-4 mr-2" /> Upload
                </button>
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
              className="flex items-center p-4 bg-white border border-gray-100 rounded-lg shadow-xs hover:border-blue-200 hover:bg-blue-50/30 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-[#F1F3F5] flex items-center justify-center mr-3 text-blue-600">
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
              className="px-4 py-2 bg-[#F1F3F5] hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors border border-gray-200/50"
            >
              "{ex}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
