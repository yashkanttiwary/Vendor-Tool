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
import { SpendAnalytics } from './screens/SpendAnalytics';
import { ContractAnalyzer } from './screens/ContractAnalyzer';
import { VendorIntelligence } from './screens/VendorIntelligence';
import { Login } from './screens/Login';
import { clearAuthSession, getAuthSession } from './utils/auth';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('workspace');
  const [session, setSession] = useState(getAuthSession());

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  if (!session) {
    return <Login onAuthenticated={() => setSession(getAuthSession())} />;
  }

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans text-[#4A5568]">
      <Sidebar activeScreen={currentScreen} setActiveScreen={handleNavigate} />
      <main className="flex-1 overflow-y-auto ml-60">
        <div className="px-6 py-3 border-b bg-white sticky top-0 z-10 flex justify-between items-center">
          <span className="text-xs font-mono text-gray-500">Logged in as {session.employeeId} {String(session.token).startsWith('demo-') ? '(PW Demo Example)' : ''}</span>
          <button
            className="text-xs px-3 py-1.5 border rounded-md hover:bg-gray-50"
            onClick={() => {
              clearAuthSession();
              setSession(null);
              setCurrentScreen('workspace');
            }}
          >
            Logout
          </button>
        </div>
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
        {currentScreen === 'spend' && <SpendAnalytics />}
        {currentScreen === 'contracts' && <ContractAnalyzer />}
        {currentScreen === 'vendor' && <VendorIntelligence />}
      </main>
      <Toast />
    </div>
  );
}
