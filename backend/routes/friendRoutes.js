// backend/routes/friendRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  sendFriendRequest, 
  acceptFriendRequest, 
  declineFriendRequest, 
  revokeFriendRequest,
  removeFriend,
  getFriendRequests, 
  getFriendList 
} = require('../controllers/friendController');

router.post('/request', protect, sendFriendRequest);
router.post('/accept', protect, acceptFriendRequest);
router.post('/decline', protect, declineFriendRequest);
router.post('/revoke', protect, revokeFriendRequest); 
router.post('/remove', protect, removeFriend);         
router.get('/requests', protect, getFriendRequests);
router.get('/list', protect, getFriendList);

module.exports = router;
