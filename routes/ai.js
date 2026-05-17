const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


// --- Configuration ---
// If you are on Node < 18, you might need: const fetch = require('node-fetch');
// But Node 18+ has 'fetch' built-in.

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

// --- In-Memory Session Store ---
// WARNING: This clears when the server restarts. 
// For production, use Redis or MongoDB to store chat history.
const sessions = new Map(); 
const MAX_HISTORY = 10; // Keep last 10 exchanges

// Helper to update history
function pushMessage(sid, role, text) {
  if (!sessions.has(sid)) {
    sessions.set(sid, []);
  }
  
  const history = sessions.get(sid);
  history.push({ role, text });

  // Keep history manageable
  if (history.length > MAX_HISTORY) {
    // Remove the oldest message (FIFO)
    history.shift();
  }
}

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // 1. Validation
    if (!message) {
      return res.status(400).json({ error: 'Message field is required' });
    }
    if (!API_KEY) {
      console.error("CRITICAL: GEMINI_API_KEY is missing in .env");
      return res.status(500).json({ error: 'Server AI configuration error' });
    }

    // 2. Session Management (Cookie-based)
    // Ensure you have app.use(cookieParser()) in your server.js
    let sid = req.cookies?.cc_sid;
    if (!sid) {
      sid = uuidv4();
      // Set a cookie that lasts 24 hours
      res.cookie('cc_sid', sid, { 
        httpOnly: true, 
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 
      });
    }

    // 3. Add User Message to History
    pushMessage(sid, 'user', message);

    // 4. Prepare Payload for Gemini
    // Map 'assistant' to 'model' for the API
    const history = sessions.get(sid) || [];
    const contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // 5. Call Gemini API
    const url = `${GEMINI_URL}?key=${API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    // 6. Extract Reply safely
    // Gemini 1.5 structure: candidates[0].content.parts[0].text
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text 
                  || "I'm having trouble thinking right now. Please try again.";

    // 7. Save Assistant Reply to History
    pushMessage(sid, 'assistant', reply);

    // 8. Send Response
    res.json({ reply });

  } catch (err) {
    console.error('Chat Route Error:', err.message);
    res.status(500).json({ 
      error: 'Failed to process request', 
      details: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
});

module.exports = router;