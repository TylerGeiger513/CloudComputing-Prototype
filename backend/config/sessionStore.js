// config/sessionStore.js
const session = require('express-session');
const { RedisStore } = require('connect-redis');
const redisClient = require('./redisClient');
const config = require('./config');

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: config.SESSION_LIFETIME,
    httpOnly: true, // prevents client-side JS from reading the cookie
    secure: config.COOKIE.secure, // set true in production (HTTPS)
    sameSite: config.COOKIE.sameSite,
  },
});

module.exports = sessionMiddleware;
