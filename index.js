require('dotenv').config({ override: true });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongo = require('./mongo');

const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const aiRoutes = require('./routes/ai');
const uploadRoutes = require('./routes/upload');
const notificationRoutes = require('./routes/notifications');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Connect DB
mongo.connect();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/notifications', notificationRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;