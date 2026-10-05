const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Wishlist = require('../models/Wishlist');
const Gift = require('../models/Gift');
const auth = require('../middleware/auth');

// POST /api/wishlists — créer une wishlist
router.post('/', auth, async (req, res) => {
  try {
    const { name, recipientId } = req.body;
    if (!name) return res.status(400).json({ message: 'Nom requis' });

    const wishlist = new Wishlist({
      user: req.user.id,
      name,
      recipientId: recipientId || null,
      gifts: [],
      shareToken: crypto.randomBytes(16).toString('hex')
    });

    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// GET /api/wishlists — mes wishlists (optionnel: filtrer par proche)
router.get('/', auth, async (req, res) => {
  try {
    const filter = { user: req.user.id };
    if (req.query.recipientId) filter.recipientId = req.query.recipientId;

    const wishlists = await Wishlist.find(filter)
      .populate('gifts')
      .populate('recipientId', 'name relation')
      .sort({ createdAt: -1 });
    res.json(wishlists);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// GET /api/wishlists/share/:token — accès public par lien
router.get('/share/:token', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ shareToken: req.params.token })
      .populate('gifts')
      .populate('recipientId', 'name relation');
    if (!wishlist) return res.status(404).json({ message: 'Wishlist introuvable' });
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// GET /api/wishlists/:id — une wishlist par ID
router.get('/:id', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ _id: req.params.id, user: req.user.id })
      .populate('gifts')
      .populate('recipientId', 'name relation');
    if (!wishlist) return res.status(404).json({ message: 'Wishlist introuvable' });
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// POST /api/wishlists/:id/gifts — ajouter un cadeau
router.post('/:id/gifts', auth, async (req, res) => {
  try {
    const { giftId } = req.body;
    if (!giftId) return res.status(400).json({ message: 'giftId requis' });

    const wishlist = await Wishlist.findOne({ _id: req.params.id, user: req.user.id });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist introuvable' });

    if (wishlist.gifts.includes(giftId)) {
      return res.status(400).json({ message: 'Cadeau déjà dans la wishlist' });
    }

    wishlist.gifts.push(giftId);
    await wishlist.save();

    const updated = await Wishlist.findById(wishlist._id).populate('gifts');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// DELETE /api/wishlists/:id/gifts/:giftId — retirer un cadeau
router.delete('/:id/gifts/:giftId', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ _id: req.params.id, user: req.user.id });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist introuvable' });

    wishlist.gifts = wishlist.gifts.filter(g => g.toString() !== req.params.giftId);
    await wishlist.save();

    const updated = await Wishlist.findById(wishlist._id).populate('gifts');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// PATCH /api/wishlists/:id/toggle-public
router.patch('/:id/toggle-public', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ _id: req.params.id, user: req.user.id });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist introuvable' });

    wishlist.isPublic = !wishlist.isPublic;
    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// PATCH /api/wishlists/:id — rename ou changer recipientId
router.patch('/:id', auth, async (req, res) => {
  try {
    const { name, recipientId } = req.body;
    const update = {};
    if (name)        update.name        = name;
    if (recipientId !== undefined) update.recipientId = recipientId || null;

    const wishlist = await Wishlist.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      update,
      { new: true }
    );
    if (!wishlist) return res.status(404).json({ message: 'Wishlist introuvable' });
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/wishlists/:id — supprimer
router.delete('/:id', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist introuvable' });
    res.json({ message: 'Wishlist supprimée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// POST /api/wishlists/:id/purchase/:giftId
router.post('/:id/purchase/:giftId', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ _id: req.params.id, user: req.user.id });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist introuvable' });

    if (!wishlist.purchasedGifts.includes(req.params.giftId)) {
      wishlist.purchasedGifts.push(req.params.giftId);
      await wishlist.save();
    }
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/wishlists/:id/purchase/:giftId
router.delete('/:id/purchase/:giftId', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ _id: req.params.id, user: req.user.id });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist introuvable' });

    wishlist.purchasedGifts = wishlist.purchasedGifts.filter(
      g => g.toString() !== req.params.giftId
    );
    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;