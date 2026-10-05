const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text:    { type: String, required: true },
}, { timestamps: true });

const feedPostSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gift:        { type: mongoose.Schema.Types.ObjectId, ref: 'Gift' },
  giftName:    { type: String },
  description: { type: String, required: true },
  image:       { type: String, default: '🎁' },   // emoji
  photo:       { type: String, default: '' },      // image URL
  link:        { type: String, default: '' },      // where to buy
  occasion:    { type: String, default: 'autre' },
  likes:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments:    [commentSchema],
}, { timestamps: true });

module.exports = mongoose.model('FeedPost', feedPostSchema);