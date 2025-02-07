// config/redisClient.js
const redis = require('redis');
const config = require('./config');



const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || 'redis',
    port: process.env.REDIS_PORT || 6379,
  },
  password: config.REDIS.password,
});

client.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  await client.connect();
  console.log('Redis connected');
})();

module.exports = client;
