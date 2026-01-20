const Tool = require('../models/Tool');

// @desc    Get all tools (with filtering)
// @route   GET /api/tools
exports.getTools = async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.categories = category;
    }
    if (featured === 'true') {
      query.isFeatured = true;
    }

    const tools = await Tool.find(query).sort({ name: 1 });
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single tool by slug
// @route   GET /api/tools/:slug
exports.getToolBySlug = async (req, res) => {
  try {
    const tool = await Tool.findOne({ slug: req.params.slug });
    if (tool) {
      res.json(tool);
    } else {
      res.status(404).json({ message: 'Tool not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get list of all unique categories
// @route   GET /api/tools/meta/categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Tool.distinct('categories');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};