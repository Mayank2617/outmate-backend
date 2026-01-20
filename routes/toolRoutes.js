const express = require('express');
const router = express.Router();
const { getTools, getToolBySlug, getCategories } = require('../controllers/toolController');

router.get('/', getTools);
router.get('/meta/categories', getCategories);
router.get('/:slug', getToolBySlug);

module.exports = router;