// app.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const sessionMiddleware = require('./config/sessionStore');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const { requestLogger } = require('./middleware/logging');
const config = require('./config/config');
const friendRoutes = require('./routes/friendRoutes');

const app = express();

// --- Security Middlewares --- //

// Set various HTTP headers for security.
app.use(helmet());

// Enable CORS - in production, restrict origins as needed.
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Rate limiting to mitigate brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// --- Parsing Middlewares --- //
app.use(express.json({ limit: '10kb' })); // limit body size
app.use(express.urlencoded({ extended: true }));

// --- Session Middleware --- //
app.use(sessionMiddleware);

// -- Logging Middleware --- //
app.use(requestLogger);
// --- Routes --- //
app.use('/api/auth', authRoutes);
app.use('/api/friends', friendRoutes);

// --- Error Handling Middleware --- //
app.use(errorHandler);

module.exports = app;
