const User = require('../models/User');

// POST /signup
exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Add validations as needed.
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    

    const user = new User({ username, email, password });
    await user.save();

    // Optionally, log the user in immediately:
    req.session.userId = user._id;

    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    next(error);
  }
};

// DELETE /delete: Deletes the user after password confirmation
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
    
    // Compare the provided password with the stored hash
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    
    // Delete the user from the database
    await User.findByIdAndDelete(user._id);
    
    // Destroy the session and clear the cookie
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

// POST /login
exports.login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Store the user's ID in the session
    req.session.userId = user._id;

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    next(error);
  }
};

// GET /profile
exports.getUserProfile = async (req, res, next) => {
  if (!req.session || !req.session.userId) {
    console.log("No user found in cookie, not logged in.");
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

// POST /logout
exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    // Also clear the cookie on the client
    res.clearCookie('connect.sid', {
      httpOnly: true,
      secure: req.app.get('env') === 'production',
      sameSite: req.app.get('env') === 'production' ? 'Strict' : 'Lax',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  });
};