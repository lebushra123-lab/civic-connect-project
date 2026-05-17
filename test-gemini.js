// Run this file using: node test-gemini.js
require('dotenv').config({ override: true });

// Polyfill fetch for older Node versions
const fetch = globalThis.fetch || ((...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)));

async function testGemini() {
    console.log("--- STARTING GEMINI TEST ---");

    // 1. Check API Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("❌ ERROR: GEMINI_API_KEY is missing from .env file");
        return;
    }
    console.log("✅ API Key found:", apiKey.substring(0, 10) + "...");

    // 2. Prepare Payload
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{
            parts: [{ text: "Say 'Hello, the API is working!'" }]
        }]
    };

    try {
        console.log("📡 Sending request to Google...");
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.log("📩 Response Status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ API ERROR RESPONSE:");
            console.error(errorText);
            return;
        }

        const data = await response.json();
        
        // Check for specific API errors in JSON
        if (data.error) {
            console.error("❌ GEMINI API ERROR:", data.error.message);
            return;
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log("✅ SUCCESS! Gemini says:");
        console.log(reply);

    } catch (error) {
        console.error("❌ NETWORK/CODE ERROR:", error.message);
    }
}

testGemini();