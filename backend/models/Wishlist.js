const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientId:    { type: mongoose.Schema.Types.ObjectId, ref: 'RecipientProfile', default: null },
  name:           { type: String, required: true },
  gifts:          [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gift' }],
  purchasedGifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gift' }],
  shareToken:     { type: String, unique: true, sparse: true },
  isPublic:       { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);