const products = require('../data/products');

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

// Compact product catalogue passed to the model as grounding context.
function buildProductContext() {
  return products
    .map(
      (p) =>
        `- ${p.name} (id ${p.id}): ₹${p.price}. ${p.description}`
    )
    .join('\n');
}

function systemPrompt() {
  return [
    'You are a helpful shopping assistant for a small e-commerce store.',
    'Answer customer questions using ONLY the product catalogue below.',
    'If a question is unrelated to these products or the store, politely say you can only help with the store\'s products.',
    'Keep replies short, friendly, and specific. Prices are in Indian Rupees (₹).',
    '',
    'Product catalogue:',
    buildProductContext(),
  ].join('\n');
}

// POST /api/chat  { message: string, history?: [{role, content}] }
async function chat(req, res) {
  const { message, history } = req.body || {};

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: 'message is required' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res
      .status(503)
      .json({ error: 'Chat is not configured (missing GROQ_API_KEY).' });
  }

  // Support optional multi-turn history from the frontend; fall back to single-turn.
  const priorTurns = Array.isArray(history)
    ? history
        .filter((m) => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
        .slice(-10)
    : [];

  const messages = [
    { role: 'system', content: systemPrompt() },
    ...priorTurns,
    { role: 'user', content: message },
  ];

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.4,
        max_tokens: 300,
      }),
    });

    if (!groqRes.ok) {
      const detail = await groqRes.text();
      console.error('Groq API error', groqRes.status, detail);
      return res
        .status(502)
        .json({ error: 'Upstream LLM error', status: groqRes.status });
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json({ error: 'Empty response from LLM' });
    }

    return res.json({ reply });
  } catch (err) {
    console.error('Chat request failed', err);
    return res.status(500).json({ error: 'Chat request failed' });
  }
}

module.exports = { chat };
