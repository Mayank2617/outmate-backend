const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptController');

// 1. Static Routes (Must come first)
router.get('/categories', promptController.getCategories);

// 2. ID-based Routes
router.get('/detail/:id', promptController.getPromptById);

// 3. Dynamic Slug Route (Must come last)
// This catches /sales-engineering, /gtm-strategy, etc.
router.get('/:slug', promptController.getPromptsByCategory);

module.exports = router;