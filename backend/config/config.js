// config/config.js
const dotenv = require('dotenv');
const path = require('path');

// Load environment-specific .env file
const env = process.env.NODE_ENV || 'development';
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${env}`)
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  REDIS: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD || undefined,
  },
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_LIFETIME: parseInt(process.env.SESSION_LIFETIME, 10) || 86400000,
  COOKIE: {
    secure: process.env.COOKIE_SECURE === 'true', // must be true in production (HTTPS)
    sameSite: process.env.COOKIE_SAME_SITE || 'Lax',
  }
};
