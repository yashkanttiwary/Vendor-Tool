import express from 'express';
import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';

const app = express();
const port = process.env.GENIE_BACKEND_PORT || 8787;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-session-token');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json({ limit: '1mb' }));

const sessions = new Map();

app.post('/api/auth/login', (req, res) => {
  const { employeeId, apiKey } = req.body || {};
  if (!employeeId || !apiKey) {
    return res.status(400).json({ error: 'Employee ID and API key are required.' });
  }
  if (!/^PW[-_]?\d{3,}$/i.test(employeeId)) {
    return res.status(400).json({ error: 'Employee ID must look like PW-1234.' });
  }

  const token = crypto.randomUUID();
  sessions.set(token, {
    employeeId: employeeId.toUpperCase(),
    apiKey,
    createdAt: Date.now(),
  });

  return res.json({ token, employeeId: employeeId.toUpperCase() });
});

const auth = (req, res, next) => {
  const token = req.headers['x-session-token'];
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.session = sessions.get(token);
  next();
};

app.post('/api/ai/parse', auth, async (req, res) => {
  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'prompt is required' });

  try {
    const client = new GoogleGenAI({ apiKey: req.session.apiKey });
    const out = await client.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Extract JSON with keys category,city,budget,timeline,quantity,services from: ${prompt}`,
      config: { responseMimeType: 'application/json' },
    });
    const parsed = JSON.parse(out.text || '{}');
    return res.json({ parsed });
  } catch (error) {
    return res.status(500).json({
      error: 'AI parse failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

app.listen(port, () => {
  console.log(`GENIE backend listening on http://localhost:${port}`);
});
