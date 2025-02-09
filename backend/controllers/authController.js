// backend/controllers/authController.js
const User = require('../models/User');

// POST /api/auth/signup
exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ username, email, password });
    await user.save();

    // Auto login after signup: set the userId on the session.
    req.session.userId = user._id;
    // Force the session to be saved so that a Set-Cookie header is sent.
    req.session.save((err) => {
      if (err) return next(err);
      res.status(201).json({ message: 'User created successfully', userId: user._id });
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    console.log('Password comparison result:', isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Set the session property
    req.session.userId = user._id;
    // Force session saving so that the cookie is sent to the client.
    req.session.save((err) => {
      if (err) return next(err);
      res.status(200).json({ message: 'Logged in successfully' });
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/profile
exports.getUserProfile = async (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(200).json({ message: 'Not logged in' });
  }
  try {
    const user = await User.findById(req.session.userId).select('-password');
    if (!user) {
      return res.status(200).json({ message: 'Not logged in' });
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/logout
exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('connect.sid', {
      httpOnly: true,
      secure: req.app.get('env') === 'production',
      sameSite: req.app.get('env') === 'production' ? 'Strict' : 'Lax',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  });
};

// DELETE /api/auth/delete
exports.deleteUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    await User.findByIdAndDelete(user._id);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie('connect.sid', {
        httpOnly: true,
        secure: req.app.get('env') === 'production',
        sameSite: req.app.get('env') === 'production' ? 'Strict' : 'Lax',
      });
      res.status(200).json({ message: 'User deleted successfully' });
    });
  } catch (error) {
    next(error);
  }
};
