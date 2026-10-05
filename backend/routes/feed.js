const express = require('express');
const router = express.Router();
const FeedPost = require('../models/FeedPost');
const auth = require('../middleware/auth');

// GET /api/feed
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category && category !== 'tous'
      ? { occasion: category.toLowerCase() } : {};
    const posts = await FeedPost.find(query)
      .populate('user', 'name')
      .populate('gift', 'name image price link')
      .populate('comments.user', 'name')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/feed — create post
router.post('/', auth, async (req, res) => {
  try {
    const { giftId, giftName, description, image, photo, link, occasion } = req.body;
    if (!description) return res.status(400).json({ message: 'Description requise' });
    const post = await FeedPost.create({
      user: req.user.id,
      gift: giftId || null,
      giftName: giftName || null,
      description,
      image: image || '🎁',
      photo: photo || '',
      link: link || '',
      occasion: occasion || 'autre',
    });
    const populated = await FeedPost.findById(post._id)
      .populate('user', 'name')
      .populate('gift', 'name image price link')
      .populate('comments.user', 'name');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/feed/:id/like — toggle like
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await FeedPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post introuvable' });
    const alreadyLiked = post.likes.includes(req.user.id);
    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    res.json({ likes: post.likes.length, liked: !alreadyLiked });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/feed/:id/comments — add comment
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim()) return res.status(400).json({ message: 'Commentaire vide' });
    const post = await FeedPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post introuvable' });
    post.comments.push({ user: req.user.id, text });
    await post.save();
    const updated = await FeedPost.findById(post._id)
      .populate('comments.user', 'name');
    res.json(updated.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/feed/:id/comments/:commentId — delete comment
router.delete('/:id/comments/:commentId', auth, async (req, res) => {
  try {
    const post = await FeedPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post introuvable' });
    post.comments = post.comments.filter(
      c => !(c._id.toString() === req.params.commentId &&
             c.user.toString() === req.user.id)
    );
    await post.save();
    res.json({ message: 'Commentaire supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/feed/:id — delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await FeedPost.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!post) return res.status(404).json({ message: 'Post introuvable' });
    res.json({ message: 'Post supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;