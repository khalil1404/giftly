const express = require('express');
const router = express.Router();

// POST /api/chat — calls the Python ML API
router.post('/', async (req, res) => {
  try {
    const { message, personality, occasion, priceRange, age, gender } = req.body;
    if (!message) return res.status(400).json({ message: 'Message requis' });

    const response = await fetch('http://localhost:5001/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, personality, occasion, priceRange, age, gender }),
    });

    if (!response.ok) {
      throw new Error('ML API error: ' + response.status);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({
      text: "Le service IA est temporairement indisponible. Réessayez dans un instant.",
      gifts: [],
    });
  }
});

module.exports = router;
