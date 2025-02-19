const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getOrCreateDirectChannel, sendMessage, getMessages } = require('../controllers/channelController');

// Endpoint to create or get a direct channel
router.post('/direct', protect, getOrCreateDirectChannel);

// Endpoint to send a message in a channel
router.post('/message', protect, sendMessage);

// Endpoint to get messages from a specific channel
router.get('/:channelId/messages', protect, getMessages);

module.exports = router;
