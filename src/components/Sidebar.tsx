import React from 'react';
import { Home, LayoutGrid, MonitorPlay, Users, Settings, UserCircle, ShieldCheck } from 'lucide-react';

interface SidebarProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeScreen, setActiveScreen }) => {
  const navItems = [
    { id: 'workspace', label: 'Workspace', icon: Home },
    { id: 'modules', label: 'Modules', icon: LayoutGrid },
    { id: 'studio', label: 'Studio', icon: MonitorPlay },
    { id: 'audit', label: 'Audit & Risk', icon: ShieldCheck },
    { id: 'organization', label: 'Organization', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-60 bg-[#1A1D23] text-gray-400 h-screen flex flex-col fixed left-0 top-0 bottom-0 z-50">
      <div className="p-6">
        <h1 className="text-white font-bold text-xl tracking-wider">GENIE-US</h1>
      </div>
      
      <nav className="flex-1 mt-4">
        {navItems.map((item) => {
          const isModuleScreen = ['command', 'parsed', 'discovery', 'negotiation', 'recommendation', 'approval'].includes(activeScreen);
          const isActive = activeScreen === item.id || (item.id === 'modules' && isModuleScreen);
          return (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive 
                  ? 'text-white bg-[#2D3142]/50 border-l-4 border-blue-500' 
                  : 'hover:text-gray-200 hover:bg-[#2D3142]/30 border-l-4 border-transparent'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-gray-800">
        <div className="flex items-center">
          <UserCircle className="w-8 h-8 text-gray-300 mr-3" />
          <div>
            <div className="text-white text-sm font-medium">Amit Sharma</div>
            <div className="text-xs text-gray-500 flex items-center mt-1">
              <ShieldCheck className="w-3 h-3 mr-1" /> PW Internal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
