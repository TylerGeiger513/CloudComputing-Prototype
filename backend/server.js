const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the auth routes
app.use('/api/auth', authRoutes);

// Example of a protected route using the auth middleware
const { protect } = require('./middlewares/authMiddleware');
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you have access!` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
