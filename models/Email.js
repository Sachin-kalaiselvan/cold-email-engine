const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  recipientEmail: {
    type: String,
    required: true
  },
  recipientName: String,
  companyName: String,
  subject: String,
  htmlContent: String,
  plainTextContent: String,
  
  sentAt: Date,
  sentIp: String,
  messageId: String,
  
  opened: {
    type: Boolean,
    default: false
  },
  openedAt: Date,
  openedIp: String,
  openedUserAgent: String,
  openCount: {
    type: Number,
    default: 0
  },
  
  clicked: {
    type: Boolean,
    default: false
  },
  clickedAt: Date,
  clickedUrl: String,
  clickCount: {
    type: Number,
    default: 0
  },
  
  replied: {
    type: Boolean,
    default: false
  },
  repliedAt: Date,
  replyFrom: String,
  replySubject: String,
  replyBody: String,
  
  bounced: {
    type: Boolean,
    default: false
  },
  bouncedAt: Date,
  bounceReason: String,
  
  unsubscribed: {
    type: Boolean,
    default: false
  },
  unsubscribedAt: Date,
  
  personalizationData: mongoose.Schema.Types.Mixed,
  
  status: {
    type: String,
    enum: ['pending', 'sent', 'opened', 'clicked', 'replied', 'bounced', 'failed'],
    default: 'pending'
  },
  errorMessage: String,
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

emailSchema.index({ campaignId: 1, sentAt: 1 });
emailSchema.index({ userId: 1, repliedAt: 1 });

module.exports = mongoose.model('Email', emailSchema);
