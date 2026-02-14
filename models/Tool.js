const mongoose = require('mongoose');

const ToolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // For the URL
  logo: { type: String }, // URL to image
  categories: [{ type: String }], // Array, e.g., ["CRM", "Email"]
  isFeatured: { type: Boolean, default: false }, // For the top section

  // -- Links --
  websiteLink: { type: String },
  lastName: { type: String }, // Placeholder if needed
  linkedInLink: { type: String }, // Updated to match JSON
  youTubeChannelLink: { type: String }, // Updated to match JSON
  ytVideoLink: { type: String }, // Updated to match JSON
  founderLinkedinId: { type: String }, // New field

  // -- Descriptions --
  shortDescription: { type: String, maxlength: 1000 }, // For the card
  fullDescription: { type: String }, // "What is Tool Name"

  // -- Detailed Attributes --
  idealCustomerProfile: { type: String },
  pricingModel: { type: String },
  plans: [
    {
      planName: { type: String },
      price: { type: String },
      billing: { type: String },
      features: [{ type: String }]
    }
  ],
  organizationType: [{ type: String }], // Changed to Array
  complexity: { type: Number, min: 0, max: 100 },

  keyFeatures: [{ type: String }],

  faqs: [
    {
      question: { type: String },
      answer: { type: String }
    }
  ],

  // -- New Arrays --
  cta: [{ type: String }],
  proTips: [{ type: String }],
  learnMore: [
    {
      heading: { type: String },
      description: { type: String },
      link: { type: String }
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tool', ToolSchema);