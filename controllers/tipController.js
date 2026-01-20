const Tip = require('../models/Tip');

// Get all tips (optionally filter by category via query string)
exports.getTips = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }

    const tips = await Tip.find(query).sort({ createdAt: -1 });
    res.json(tips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};