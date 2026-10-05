const express = require('express');
const router = express.Router();
const RecipientProfile = require('../models/RecipientProfile');
const auth = require('../middleware/auth');

// GET /api/profiles — all proches for this user
router.get('/', auth, async (req, res) => {
  try {
    const proches = await RecipientProfile.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(proches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/profiles — create a proche
router.post('/', auth, async (req, res) => {
  try {
    const { name, relation, personality, budgetPreference, occasions, notes } = req.body;
    if (!name) return res.status(400).json({ message: 'Nom requis' });

    const proche = await RecipientProfile.create({
      user: req.user.id,
      name, relation, personality, budgetPreference,
      occasions: occasions || [],
      notes: notes || ''
    });
    res.status(201).json(proche);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/profiles/:id — update a proche
router.put('/:id', auth, async (req, res) => {
  try {
    const proche = await RecipientProfile.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!proche) return res.status(404).json({ message: 'Proche introuvable' });
    res.json(proche);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/profiles/:id — delete a proche
router.delete('/:id', auth, async (req, res) => {
  try {
    await RecipientProfile.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Proche supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;