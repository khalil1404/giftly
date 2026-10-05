const mongoose = require('mongoose');

const rappelSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  label:    { type: String, required: true },
  date:     { type: Date, required: true },
  procheId: { type: mongoose.Schema.Types.ObjectId, ref: 'RecipientProfile', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Rappel', rappelSchema);