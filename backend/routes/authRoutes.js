// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getUserProfile,
  logout,
  deleteUser,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { signupValidator, loginValidator } = require('../middleware/validators/authValidator');

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.get('/profile', protect, getUserProfile);
router.post('/logout', protect, logout);
router.delete('/delete', protect, deleteUser);

module.exports = router;
