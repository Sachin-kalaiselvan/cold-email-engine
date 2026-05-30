const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  avatarUrl: String,
  emailsPerDay: {
    type: Number,
    default: 150
  },
  emailsPerHour: {
    type: Number,
    default: 30
  },
  emailsPerMinute: {
    type: Number,
    default: 2
  },
  smtpConfig: {
    host: String,
    port: Number,
    user: String,
    pass: String
  },
  senderEmail: String,
  senderName: String,
  timezone: {
    type: String,
    default: 'Asia/Kolkata'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
