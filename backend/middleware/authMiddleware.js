// middleware/authMiddleware.js
const protect = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    console.log("No user found in cookie, not logged in.");
    // Instead of returning a 401 error, you can return a 200 response with a message.
    return res.status(200).json({ message: 'Not logged in' });
  }
  next();
};

module.exports = { protect };
