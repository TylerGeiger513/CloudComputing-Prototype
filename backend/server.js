// server.js
const app = require('./app');
const config = require('./config/config');
const connectDB = require('./config/db');

const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  // Start the server
  app.listen(config.PORT, () => {
    console.log(`Server running in ${config.NODE_ENV} mode on port ${config.PORT}`);
  });
};

startServer();
