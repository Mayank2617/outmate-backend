const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const PromptCategory = require('../models/PromptCategory');

// THE DATA
const categories = [
  {
    title: "GTM Strategy",
    description: "Comprehensive frameworks for product launches, market entry, and positioning statements.",
    slug: "gtm-strategy",
    iconKey: "rocket",
    promptCount: 12,
    isFeatured: true
  },
  {
    title: "Sales Engineering",
    description: "Technical discovery questions, demo scripts, and objection handling scenarios.",
    slug: "sales-engineering",
    iconKey: "chart",
    promptCount: 24,
    isFeatured: false
  },
  {
    title: "Content Marketing",
    description: "SEO blog outlines, viral social media hooks, and content cluster generators.",
    slug: "content-marketing",
    iconKey: "pen",
    promptCount: 45,
    isFeatured: true
  },
  {
    title: "Cold Outreach",
    description: "High-conversion cold emails, LinkedIn icebreakers, and follow-up sequences.",
    slug: "cold-outreach",
    iconKey: "mail",
    promptCount: 30,
    isFeatured: true
  },
  {
    title: "E-Commerce Growth",
    description: "Product descriptions, ad copy variations, and customer retention email flows.",
    slug: "ecommerce",
    iconKey: "cart",
    promptCount: 18,
    isFeatured: false
  },
  {
    title: "Executive Strategy",
    description: "Board meeting preparation, strategic decision memos, and leadership communication.",
    slug: "executive",
    iconKey: "briefcase",
    promptCount: 8,
    isFeatured: false
  }
];

const seedDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is undefined in .env");
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing to avoid duplicates
    await PromptCategory.deleteMany({});
    console.log("🧹 Cleared old categories");

    // Insert new
    await PromptCategory.insertMany(categories);
    console.log(`✅ Successfully seeded ${categories.length} categories!`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

seedDB();