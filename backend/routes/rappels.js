const express = require('express');
const router = express.Router();
const Rappel = require('../models/Rappel');
const auth = require('../middleware/auth');

// GET /api/rappels
router.get('/', auth, async (req, res) => {
  try {
    const rappels = await Rappel.find({ user: req.user.id }).sort({ date: 1 });
    const now = new Date();
    const withCountdown = rappels.map(r => ({
      ...r.toObject(),
      daysLeft: Math.ceil((new Date(r.date) - now) / (1000 * 60 * 60 * 24))
    }));
    res.json(withCountdown);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/rappels
router.post('/', auth, async (req, res) => {
  try {
    const { label, date, procheId } = req.body;
    if (!label || !date) return res.status(400).json({ message: 'Label et date requis' });
    const rappel = await Rappel.create({ user: req.user.id, label, date, procheId: procheId || null });
    res.status(201).json(rappel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/rappels/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Rappel.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Rappel supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;