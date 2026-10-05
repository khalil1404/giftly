const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stars: { type: Number, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const giftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  priceRange: { type: String, enum: ['low', 'mid', 'high', 'luxury'] },
  category: { type: String },
  personality: [{ type: String }],
  occasion: [{ type: String }],
  tags: [{ type: String }],
  link: { type: String },
  image: { type: String },
  ratings: [ratingSchema],
  averageRating: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gift', giftSchema);
