const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');

// Route to get list (with search & pagination)
router.get('/', workflowController.getWorkflows);

// Route to get single workflow (with full JSON)
router.get('/:id', workflowController.getWorkflowById);

// Route to trigger Sync manually
router.post('/sync', workflowController.syncWorkflows);

module.exports = router;