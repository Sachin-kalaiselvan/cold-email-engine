const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
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
  subject: {
    type: String,
    required: true
  },
  htmlContent: {
    type: String,
    required: true
  },
  plainTextContent: String,
  
  variables: [{
    name: String,
    description: String,
    example: String
  }],
  
  previewImageUrl: String,
  category: String,
  
  usedInCampaigns: {
    type: Number,
    default: 0
  },
  totalSent: {
    type: Number,
    default: 0
  },
  averageOpenRate: Number,
  averageClickRate: Number,
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Template', templateSchema);
