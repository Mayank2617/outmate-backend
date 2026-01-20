const PromptCategory = require('../models/PromptCategory');
const Prompt = require('../models/Prompt'); // Import the new model

// Initial Dummy Data
const SEED_DATA = [
  {
    title: "GTM Strategy",
    description: "Launch plans, positioning frameworks, and market entry prompts.",
    slug: "gtm-strategy",
    iconKey: "rocket",
    promptCount: 15
  },
  {
    title: "Sales Engineering",
    description: "Discovery questions, demo scripts, and objection handling.",
    slug: "sales",
    iconKey: "chart",
    promptCount: 24
  },
  {
    title: "Content Marketing",
    description: "Blog outlines, social media hooks, and SEO cluster generators.",
    slug: "marketing",
    iconKey: "pen",
    promptCount: 42
  },
  {
    title: "E-Commerce Growth",
    description: "Product descriptions, ad copy, and retention email sequences.",
    slug: "ecommerce",
    iconKey: "cart",
    promptCount: 18
  },
  {
    title: "Cold Outreach",
    description: "Icebreakers, value propositions, and follow-up templates.",
    slug: "outreach",
    iconKey: "mail",
    promptCount: 30
  },
  {
    title: "Executive Strategy",
    description: "Board meeting prep, strategic memos, and decision frameworks.",
    slug: "executive",
    iconKey: "briefcase",
    promptCount: 12
  }
];

exports.getCategories = async (req, res) => {
  try {
    // Check if empty, if so, seed data
    const count = await PromptCategory.countDocuments();
    if (count === 0) {
      await PromptCategory.insertMany(SEED_DATA);
      console.log("🌱 Seeded Prompt Categories");
    }

    const categories = await PromptCategory.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPromptsByCategory = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1. Find the Category details (for the Hero section)
    const category = await PromptCategory.findOne({ slug });
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // 2. Find all prompts belonging to this category
    const prompts = await Prompt.find({ categorySlug: slug }).sort({ views: -1 });

    res.json({
      category,
      prompts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ NEW: Get Single Prompt Details
exports.getPromptById = async (req, res) => {
  try {
    const { id } = req.params;
    const prompt = await Prompt.findById(id);
    
    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    // Increment view count
    prompt.views += 1;
    await prompt.save();

    res.json(prompt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};