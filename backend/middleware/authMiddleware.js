// middleware/authMiddleware.js
const protect = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    console.log("No user found in cookie, not logged in.");
    return res.status(200).json({ message: 'Not logged in' });
  }
  next();
};

module.exports = { protect };
