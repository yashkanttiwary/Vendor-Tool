import { GenieRequest } from './genieEngine';

const STORE_KEY = 'genie-us-request-records';

const readStore = (): Record<string, GenieRequest> => {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writeStore = (store: Record<string, GenieRequest>) => {
  window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
};

export const upsertRequestRecord = (request: GenieRequest) => {
  const store = readStore();
  store[request.id] = request;
  writeStore(store);
};

export const getRequestRecord = (id: string): GenieRequest | null => {
  const store = readStore();
  return store[id] || null;
};
