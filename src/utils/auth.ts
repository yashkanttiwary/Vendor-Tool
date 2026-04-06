export interface AuthSession {
  employeeId: string;
  token: string;
  loginAt: string;
}

const AUTH_KEY = 'genie-us-auth-session';
const REQUEST_KEYS = ['genie-us-current-request', 'genie-us-requests', 'genie-us-request-records'];

export const getAuthSession = (): AuthSession | null => {
  try {
    const raw = window.sessionStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setAuthSession = (session: AuthSession) => {
  window.sessionStorage.setItem(AUTH_KEY, JSON.stringify(session));
};

export const clearAuthSession = () => {
  window.sessionStorage.removeItem(AUTH_KEY);
  REQUEST_KEYS.forEach((key) => window.localStorage.removeItem(key));
};
