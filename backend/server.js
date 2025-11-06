const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');


const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser (built into Express)

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', authMiddleware, require('./routes/studentRoutes'));


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    console.log(`Database name: ${mongoose.connection.name}`);
    console.log(`Host: ${mongoose.connection.host}`);
    
    if (process.env.NODE_ENV !== 'test') {
      // Start server only if not running tests
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));


// Export the app for testing
module.exports = app;
