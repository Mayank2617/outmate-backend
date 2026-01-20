const mongoose = require('mongoose');

const TipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // The main tip text
  category: {
    type: String,
    required: true,
    enum: ['aeo', 'outbound', 'gtm', 'email-marketing', 'linkedin-outreach'] // The specific categories you asked for
  },
  author: { type: String, default: "Outmate Team" },
  readTime: { type: String, default: "2 min read" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tip', TipSchema);