// middleware/logging.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

const requestLogger = (req, res, next) => {
  logger.info(`Incoming ${req.method} request on ${req.url}`);
  next();
};

module.exports = { logger, requestLogger };
