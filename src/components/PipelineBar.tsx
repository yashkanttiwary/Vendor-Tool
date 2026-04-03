import React from 'react';
import { Check } from 'lucide-react';

export type PipelineState = 'draft' | 'parsed' | 'discovering' | 'shortlisted' | 'quote_collected' | 'benchmark_ready' | 'negotiation_ready' | 'recommended' | 'awaiting_approval' | 'approved' | 'rejected' | 'archived';

interface PipelineBarProps {
  currentState: PipelineState;
  onNavigate: (state: PipelineState) => void;
}

const STAGES = [
  { id: 'parsed', label: 'Parsed' },
  { id: 'discovering', label: 'Discovering' },
  { id: 'shortlisted', label: 'Shortlisted' },
  { id: 'negotiation_ready', label: 'Negotiation' },
  { id: 'recommended', label: 'Recommended' },
  { id: 'awaiting_approval', label: 'Approval' },
];

export const PipelineBar: React.FC<PipelineBarProps> = ({ currentState, onNavigate }) => {
  const currentIndex = STAGES.findIndex(s => s.id === currentState);

  return (
    <div className="bg-white rounded-lg p-4 mb-6 shadow-xs border border-gray-100 flex items-center justify-between overflow-x-auto">
      <div className="flex items-center space-x-2 min-w-max">
        {STAGES.map((stage, index) => {
          const isCompleted = index < currentIndex || currentState === 'approved';
          const isActive = index === currentIndex && currentState !== 'approved';
          const isUpcoming = index > currentIndex && currentState !== 'approved';

          return (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => isCompleted ? onNavigate(stage.id as PipelineState) : null}
                disabled={!isCompleted && !isActive}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                  isCompleted ? 'text-green-600 hover:bg-green-50 cursor-pointer' :
                  isActive ? 'bg-blue-50 text-blue-600 cursor-default' :
                  'text-gray-400 cursor-not-allowed'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : isActive ? (
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                ) : (
                  <div className="w-2 h-2 rounded-full border-2 border-gray-300" />
                )}
                <span>{stage.label}</span>
              </button>
              
              {index < STAGES.length - 1 && (
                <div className={`w-8 h-px ${isCompleted ? 'bg-green-200' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      <div className="ml-4 px-3 py-1 bg-gray-100 text-gray-500 text-xs font-mono rounded-md border border-gray-200 whitespace-nowrap">
        Demo Data
      </div>
    </div>
  );
};
