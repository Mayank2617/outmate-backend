const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // "What this prompt does"
  content: { type: String, required: true }, // The actual prompt text
  categorySlug: { type: String, required: true, index: true }, 
  tags: [String],
  views: { type: Number, default: 0 },
  
  // ✅ NEW FIELDS
  tips: [String], // Array of strings for the "Tips" section
  instructions: [String], // Array of strings for "How to use"
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prompt', PromptSchema);