const mongoose = require('mongoose');

const PromptCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // e.g., 'gtm-strategy'
  iconKey: { type: String, default: 'default' }, // To map to frontend icons
  promptCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false }
});

module.exports = mongoose.model('PromptCategory', PromptCategorySchema);