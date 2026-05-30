const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  brand: {
    type: String,
    enum: ['ingredient-list', 'threxa'],
    default: 'ingredient-list'
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'completed', 'archived'],
    default: 'draft'
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template'
  },
  targetList: [{
    email: String,
    companyName: String,
    founderName: String,
    recentMilestone: String,
    customVariables: mongoose.Schema.Types.Mixed
  }],
  schedule: {
    startDate: Date,
    timezone: String,
    emailsPerDay: Number,
    emailsPerHour: Number,
    emailsPerMinute: Number,
    bestTimeToSend: String
  },
  sentCount: {
    type: Number,
    default: 0
  },
  openCount: {
    type: Number,
    default: 0
  },
  clickCount: {
    type: Number,
    default: 0
  },
  replyCount: {
    type: Number,
    default: 0
  },
  bounceCount: {
    type: Number,
    default: 0
  },
  openRate: Number,
  clickRate: Number,
  replyRate: Number,
  launchedAt: Date,
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Campaign', campaignSchema);
