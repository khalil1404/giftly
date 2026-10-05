const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type:    { type: String, enum: ['RAPPEL', 'SUGGESTION', 'SYSTEME'], default: 'RAPPEL' },
  message: { type: String, required: true },
  read:    { type: Boolean, default: false },
  rappelId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Rappel', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);