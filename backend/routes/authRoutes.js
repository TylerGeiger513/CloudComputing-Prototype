// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getUserProfile,
  logout,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, getUserProfile);
router.post('/logout', protect, logout);

module.exports = router;
