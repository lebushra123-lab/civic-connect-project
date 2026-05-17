const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, default: 'INFO' }, // e.g. STATUS_UPDATE, ASSIGNMENT
  read: { type: Boolean, default: false },
  relatedId: String // e.g. Complaint ID
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
