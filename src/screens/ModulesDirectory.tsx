import React from 'react';
import { Search, Zap, FileText, Users, BarChart } from 'lucide-react';
import { showToast } from '../components/Toast';

export const ModulesDirectory: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  const modules = [
    {
      id: 'sourcing',
      title: 'Sourcing Copilot',
      description: 'AI-assisted vendor discovery, quoting, and negotiation.',
      icon: Search,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      action: () => onNavigate('command')
    },
    {
      id: 'contracts',
      title: 'Contract Analyzer',
      description: 'Review MSAs and SOWs for compliance and risk.',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      action: () => onNavigate('contracts')
    },
    {
      id: 'vendor',
      title: 'Vendor Intelligence',
      description: 'Deep dive into vendor performance and history.',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      action: () => onNavigate('vendor')
    },
    {
      id: 'spend',
      title: 'Spend Analytics',
      description: 'Visualize category spend and identify savings.',
      icon: BarChart,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      action: () => onNavigate('spend')
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1D23]">Modules Directory</h1>
        <p className="text-gray-500 mt-2 text-lg">Select an AI module to begin your workflow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod) => (
          <div 
            key={mod.id}
            onClick={mod.action}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start">
              <div className={`p-4 rounded-lg ${mod.bgColor} mr-5 group-hover:scale-105 transition-transform`}>
                <mod.icon className={`w-8 h-8 ${mod.color}`} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1A1D23] mb-2 group-hover:text-blue-600 transition-colors">{mod.title}</h2>
                <p className="text-gray-600">{mod.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
