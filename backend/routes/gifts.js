const express = require('express');
const router = express.Router();
const Gift = require('../models/Gift');
const giftsData = require('../data/gifts');

const seedGifts = async () => {
  const count = await Gift.countDocuments();
  if (count === 0) {
    await Gift.insertMany(giftsData);
    console.log('✅ Base de données cadeaux initialisée');
  }
};
seedGifts();

// GET /api/gifts — tous les cadeaux avec filtres optionnels
router.get('/', async (req, res) => {
  try {
    const { personality, priceRange, occasion, search } = req.query;
    let query = {};
    if (personality) query.personality = { $in: [personality] };
    if (priceRange) query.priceRange = priceRange;
    if (occasion) query.occasion = { $in: [occasion] };
    if (search) query.name = { $regex: search, $options: 'i' };
    const gifts = await Gift.find(query).sort({ averageRating: -1 });
    res.json(gifts);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// GET /api/gifts/quiz — résultats du quiz, passe age & gender au ML via chat route
router.get('/quiz', async (req, res) => {
  try {
    const { personality, priceRange, occasion, age, gender } = req.query;

    // Call ML API with all params including age & gender
    let gifts = [];
    try {
      const mlResponse = await fetch('http://localhost:5001/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: '',
          personality: personality || null,
          priceRange: priceRange || null,
          occasion: occasion || null,
          age: age || null,
          gender: gender || null,
        }),
      });

      if (mlResponse.ok) {
        const mlData = await mlResponse.json();
        // ML returns gift names — fetch full gift objects from MongoDB
        if (mlData.gifts && mlData.gifts.length > 0) {
          const names = mlData.gifts.map(g => g.name);
          const dbGifts = await Gift.find({ name: { $in: names } });
          // Preserve ML ranking order
          gifts = names
            .map(name => dbGifts.find(g => g.name === name))
            .filter(Boolean);
        }
      }
    } catch (mlErr) {
      console.error('🔴 ML API error, falling back to MongoDB:', mlErr.message);
    }

    // Fallback to direct MongoDB query if ML unavailable or returned nothing
    if (gifts.length === 0) {
      let query = {};
      if (personality) query.personality = { $in: [personality] };
      if (priceRange) query.priceRange = priceRange;
      if (occasion) query.occasion = { $in: [occasion] };
      gifts = await Gift.find(query).limit(6);
      if (gifts.length < 3 && personality) {
        gifts = await Gift.find({ personality: { $in: [personality] } }).limit(6);
      }
    }

    // Save to history (anti-doublon)
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const jwt = require('jsonwebtoken');
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const History = require('../models/History');

        const recent = await History.findOne({
          user: decoded.id,
          personality: personality || null,
          occasion: occasion || null,
          priceRange: priceRange || null,
          createdAt: { $gt: new Date(Date.now() - 5000) }
        });

        if (!recent) {
          await History.create({
            user:        decoded.id,
            personality: personality || null,
            occasion:    occasion    || null,
            priceRange:  priceRange  || null,
            age:         age         || null,
            gender:      gender      || null,
            gifts:       gifts.map(g => g._id),
          });
          console.log('✅ History saved');
        } else {
          console.log('⏭️ History skipped (doublon)');
        }
      }
    } catch (err) {
      console.error('🔴 History save error:', err.message);
    }

    res.json(gifts);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// GET /api/gifts/:id — un cadeau par ID
router.get('/:id', async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id);
    if (!gift) return res.status(404).json({ message: 'Cadeau non trouvé' });
    res.json(gift);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// POST /api/gifts/:id/click — tracker les clics
router.post('/:id/click', async (req, res) => {
  try {
    await Gift.findByIdAndUpdate(req.params.id, { $inc: { clicks: 1 } });
    res.json({ message: 'Clic enregistré' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// POST /api/gifts/:id/rate — noter un cadeau
router.post('/:id/rate', async (req, res) => {
  try {
    const { stars, comment, userId } = req.body;
    const gift = await Gift.findById(req.params.id);
    if (!gift) return res.status(404).json({ message: 'Cadeau non trouvé' });
    gift.ratings.push({ user: userId, stars, comment });
    const total = gift.ratings.reduce((sum, r) => sum + r.stars, 0);
    gift.averageRating = total / gift.ratings.length;
    await gift.save();
    res.json({ message: 'Note enregistrée', averageRating: gift.averageRating });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
