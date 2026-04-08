import dotenv from 'dotenv';
import express from 'express';
import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';

dotenv.config({ path: '.env.local' });
dotenv.config();

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

const runJsonGeneration = async (apiKey, instruction, payload) => {
  const client = new GoogleGenAI({ apiKey });
  const out = await client.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: `${instruction}\nReturn only valid JSON.\nInput:\n${JSON.stringify(payload)}`,
    config: { responseMimeType: 'application/json' },
  });
  return JSON.parse(out.text || '{}');
};

app.post('/api/auth/login', (req, res) => {
  const { employeeId, apiKey } = req.body || {};
  const resolvedApiKey = apiKey || process.env.GEMINI_API_KEY;
  if (!employeeId || !resolvedApiKey) {
    return res.status(400).json({ error: 'Employee ID is required and API key must be provided via login or GEMINI_API_KEY env.' });
  }
  if (!/^PW[-_]?\d{3,}$/i.test(employeeId)) {
    return res.status(400).json({ error: 'Employee ID must look like PW-1234.' });
  }

  const token = crypto.randomUUID();
  sessions.set(token, { employeeId: employeeId.toUpperCase(), apiKey: resolvedApiKey, createdAt: Date.now() });
  return res.json({ token, employeeId: employeeId.toUpperCase() });
});

const auth = (req, res, next) => {
  const token = req.headers['x-session-token'];
  if (!token || !sessions.has(token)) return res.status(401).json({ error: 'Unauthorized' });
  req.session = sessions.get(token);
  next();
};

app.post('/api/ai/parse', auth, async (req, res) => {
  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'prompt is required' });
  try {
    const parsed = await runJsonGeneration(
      req.session.apiKey,
      'Extract sourcing fields with keys: category, city, budget, timeline, quantity, services. Category must be one of Vendor Procurement, Influencer Sourcing, Event Sourcing, Freelancer Sourcing, Media Buying, Print Sourcing. Infer missing fields from natural language when possible (e.g., quantity from `500 chair`).',
      { prompt },
    );
    return res.json({ parsed });
  } catch (error) {
    return res.status(500).json({ error: 'AI parse failed', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.post('/api/ai/discovery', auth, async (req, res) => {
  const { request } = req.body || {};
  if (!request) return res.status(400).json({ error: 'request is required' });
  try {
    const result = await runJsonGeneration(
      req.session.apiKey,
      'Generate 6 candidate vendors with keys: candidates[].{name,quote,score,benchmark(low|mid|high),risk(low|medium|high),source,shortlisted,quality,reliability,riskScore,benchmarkMedian}. Ensure numeric fields are numbers.',
      { request },
    );
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'AI discovery failed', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.post('/api/ai/recommend', auth, async (req, res) => {
  const { request, candidates } = req.body || {};
  if (!request || !candidates) return res.status(400).json({ error: 'request and candidates are required' });
  try {
    const result = await runJsonGeneration(
      req.session.apiKey,
      'Generate recommendationTiers array with 3 entries for Top Pick, Best Value, Budget Safe. Fields: tier,vendorId,score,quote,savings,confidence(High|Medium),explanation,explanationType(Rule-Based|AI-Assisted). vendorId must reference candidate name index style fallback if missing.',
      { request, candidates },
    );
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'AI recommendation failed', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.post('/api/ai/negotiate', auth, async (req, res) => {
  const { request, candidate } = req.body || {};
  if (!request || !candidate) return res.status(400).json({ error: 'request and candidate are required' });
  try {
    const result = await runJsonGeneration(
      req.session.apiKey,
      'Generate negotiation object with keys: targetPrice(number) and message(string).',
      { request, candidate },
    );
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'AI negotiation failed', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.post('/api/ai/brief', auth, async (req, res) => {
  const { request, selectedVendor } = req.body || {};
  if (!request || !selectedVendor) return res.status(400).json({ error: 'request and selectedVendor are required' });
  try {
    const result = await runJsonGeneration(
      req.session.apiKey,
      'Generate execution brief JSON with key briefText (string, multiline).',
      { request, selectedVendor },
    );
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'AI brief failed', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});


app.post('/api/ai/research', auth, async (req, res) => {
  const { city, category, services, quantity, budget } = req.body || {};
  if (!city || !category) return res.status(400).json({ error: 'city and category are required' });
  try {
    const result = await runJsonGeneration(
      req.session.apiKey,
      'Generate vendorResearch array (5 items). Each item keys: name, source, reason, estimatedQuote(number). Use realistic Indian market providers when possible.',
      { city, category, services, quantity, budget },
    );
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'AI research failed', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.listen(port, () => {
  console.log(`GENIE backend listening on http://localhost:${port}`);
});
