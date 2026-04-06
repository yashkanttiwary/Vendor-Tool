import React, { useState } from 'react';
import { Lock, KeyRound, UserRound } from 'lucide-react';
import { setAuthSession } from '../utils/auth';

interface LoginProps {
  onAuthenticated: () => void;
}

export const Login: React.FC<LoginProps> = ({ onAuthenticated }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');

    if (!employeeId.trim() || !apiKey.trim()) {
      setError('Employee ID and API key are both required.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId: employeeId.trim(), apiKey: apiKey.trim() }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setError(payload?.error || 'Login failed.');
        return;
      }

      setAuthSession({
        employeeId: payload.employeeId,
        token: payload.token,
        loginAt: new Date().toISOString(),
      });
      onAuthenticated();
    } catch {
      if (!/^PW[-_]?\d{3,}$/i.test(employeeId.trim())) {
        setError('For now login is restricted to PW employee IDs (example flow).');
      } else {
        setAuthSession({
          employeeId: employeeId.trim().toUpperCase(),
          token: `demo-${Date.now()}`,
          loginAt: new Date().toISOString(),
        });
        setInfo('Backend auth is unavailable, so demo login was used. This is for example purposes; backend will be connected later.');
        onAuthenticated();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-sm p-7">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mr-3"><Lock className="w-5 h-5" /></div>
          <div>
            <h1 className="text-xl font-bold text-[#1A1D23]">GENIE-US Secure Login</h1>
            <p className="text-sm text-gray-500">Employee-gated access for internal sourcing workflows.</p>
            <p className="text-xs text-amber-600 mt-1">Currently configured for PW employee IDs only (example flow).</p>
          </div>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
        <div className="relative mb-4">
          <UserRound className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="e.g. PW-10234" className="w-full border rounded-md pl-9 pr-3 py-2.5" />
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-1">AI API Key</label>
        <div className="relative mb-4">
          <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Paste model API key" className="w-full border rounded-md pl-9 pr-3 py-2.5" />
        </div>

        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-2.5">{error}</div>}
        {info && <div className="mb-4 text-sm text-blue-700 bg-blue-50 border border-blue-100 rounded-md p-2.5">{info}</div>}

        <button disabled={loading} className={`w-full py-2.5 rounded-md text-white font-medium ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {loading ? 'Authenticating...' : 'Login & Continue'}
        </button>
      </form>
    </div>
  );
};
