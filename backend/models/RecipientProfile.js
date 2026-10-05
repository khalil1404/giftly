const mongoose = require('mongoose');

const occasionSchema = new mongoose.Schema({
  type: { type: String }, // anniversaire, eid, noël...
  date: { type: Date },
  reminded: { type: Boolean, default: false }
});

const recipientProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  relation: { type: String }, // ami, maman, collègue...
  personality: { type: String },
  interests: [{ type: String }],
  budgetPreference: { type: String, enum: ['low', 'mid', 'high', 'luxury'] },
  occasions: [occasionSchema],
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RecipientProfile', recipientProfileSchema);
