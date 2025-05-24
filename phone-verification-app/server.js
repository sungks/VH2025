require('dotenv').config();

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
    console.error(err);
    res.status(500).json({ error: 'Phone verification failed.' });
  }
});

app.post('/recommend', async (req, res) => {
  const { eventType, groupSize } = req.body;

  try {
    const prompt = `Suggest a fun, creative, and practical event idea for "${eventType}" with ${groupSize}.`;

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

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
