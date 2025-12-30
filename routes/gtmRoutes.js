const express = require('express');
const router = express.Router();
const GtmTweet = require('../models/GtmTweet');

// GET /api/gtm-tweets
router.get('/', async (req, res) => {
  try {
    const { category, page = 1 } = req.query;
    const limit = 20;
    const skip = (page - 1) * limit;

    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }

    // Sort by Date (Newest First) AND Quality (Likes)
    const tweets = await GtmTweet.find(query)
      .sort({ postedAt: -1, 'metrics.likes': -1 }) 
      .skip(skip)
      .limit(limit);

    res.json(tweets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;