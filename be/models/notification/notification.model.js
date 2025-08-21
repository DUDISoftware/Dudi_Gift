// models/notification/notification.model.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { 
      type: String, 
      enum: ['request', 'approve', 'reject', 'cancel', 'system', 'message'], 
      required: true 
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    request: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductRequest' },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    relatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

// Make sure you're exporting the model correctly
module.exports = mongoose.model('Notification', notificationSchema);