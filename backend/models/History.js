const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personality: { type: String },
  occasion:    { type: String },
  priceRange:  { type: String },
  gifts:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gift' }],
}, { timestamps: true });

module.exports = mongoose.model('History', historySchema);