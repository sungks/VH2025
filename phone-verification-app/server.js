require('dotenv').config();
//
console.log("=== ENV CHECK ===");
console.log("COHERE_API_KEY:", process.env.COHERE_API_KEY);
console.log("NUMVERIFY_API_KEY:", process.env.NUMVERIFY_API_KEY);
console.log("TWILIO_ACCOUNT_SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN);
console.log("TWILIO_SERVICE_SID:", process.env.TWILIO_SERVICE_SID);
console.log("===================");

const { client, serviceSid } = require('./twilio');


const express  = require('express');
const axios    = require('axios');
const cors     = require('cors');
const path     = require('path');

// ✅ CORRECT cohere import (latest SDK)
const cohereImport = require("cohere-ai");
const cohere = new cohereImport.CohereClient({
  token: process.env.COHERE_API_KEY,
});

const app  = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.get('/verify-phone', async (req, res) => {
  const { number, country_code = 'US' } = req.query;

  try {
    const { data } = await axios.get('http://apilayer.net/api/validate', {
      params: {
        access_key: process.env.NUMVERIFY_API_KEY,
        number,
        country_code,
        format: 1,
      },
    });

    res.json(data);
  } catch (err) {
    console.error('❌ Numverify failed:', err.response?.data || err.message);
    res.status(500).json({ error: 'Phone verification failed.' });
  }
});

app.post('/recommend', async (req, res) => {
  const { eventType, groupSize } = req.body;

  try {
    const prompt = `Suggest just one fun, creative, and practical event idea for "${eventType}" with ${groupSize} people.`;

    const response = await cohere.generate({
      model: "command", 
      prompt,
      max_tokens: 150,
      temperature: 0.8,
    });

    const recommendation = response.generations[0].text.trim();
    res.json({ recommendation });
  } catch (err) {
    console.error("Cohere API error:", err);
    res.status(500).json({ error: "Failed to get recommendation from AI." });
  }
});

app.post('/send-code', async (req, res) => {
  const { number } = req.body;
  console.log('📲 Request to /send-code with number:', number); // <--- Add this

  try {
    const result = await client.verify.v2
      .services(serviceSid)
      .verifications.create({ to: number, channel: 'sms' });

    console.log('✅ Twilio response:', result); // <--- Add this

    res.status(200).json({ success: true, message: 'Code sent' });
  } catch (err) {
    console.error('❌ Twilio error:', err); // <--- Add this
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/verify-code', async (req, res) => {
  const { number, code } = req.body;

  try {
    const verification = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: number, code });

    if (verification.status === 'approved') {
      res.status(200).json({ success: true, message: 'Phone verified' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid code' });
    }
  } catch (err) {
    console.error('Twilio verify-code error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});



app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

