import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';
import { Workspace } from './screens/Workspace';
import { CommandConsole } from './screens/CommandConsole';
import { ParsedScope } from './screens/ParsedScope';
import { Discovery } from './screens/Discovery';
import { Negotiation } from './screens/Negotiation';
import { Recommendation } from './screens/Recommendation';
import { StudioOutput } from './screens/StudioOutput';
import { Approval } from './screens/Approval';
import { ModulesDirectory } from './screens/ModulesDirectory';
import { Organization } from './screens/Organization';
import { Settings } from './screens/Settings';
import { AuditRisk } from './screens/AuditRisk';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('workspace');

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans text-[#4A5568]">
      <Sidebar activeScreen={currentScreen} setActiveScreen={handleNavigate} />
      <main className="flex-1 overflow-y-auto ml-60">
        {currentScreen === 'workspace' && <Workspace onNavigate={handleNavigate} />}
        {currentScreen === 'modules' && <ModulesDirectory onNavigate={handleNavigate} />}
        {currentScreen === 'audit' && <AuditRisk />}
        {currentScreen === 'organization' && <Organization />}
        {currentScreen === 'settings' && <Settings />}
        {currentScreen === 'command' && <CommandConsole onNavigate={handleNavigate} />}
        {currentScreen === 'parsed' && <ParsedScope onNavigate={handleNavigate} />}
        {currentScreen === 'discovery' && <Discovery onNavigate={handleNavigate} />}
        {currentScreen === 'negotiation' && <Negotiation onNavigate={handleNavigate} />}
        {currentScreen === 'recommendation' && <Recommendation onNavigate={handleNavigate} />}
        {currentScreen === 'studio' && <StudioOutput onNavigate={handleNavigate} />}
        {currentScreen === 'approval' && <Approval onNavigate={handleNavigate} />}
      </main>
      <Toast />
    </div>
  );
}
