const express = require('express');
const router = express.Router();
const History = require('../models/History');
const auth = require('../middleware/auth');

// GET /api/history — fetch user's search history
router.get('/', auth, async (req, res) => {
  try {
    const entries = await History.find({ user: req.user.id })
      .populate('gifts')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/history/:id — delete one entry
router.delete('/:id', auth, async (req, res) => {
  try {
    await History.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Entrée supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;