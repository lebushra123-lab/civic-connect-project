const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/civic-complaints';

async function connect() {
  await mongoose.connect(MONGO_URI, { autoIndex: true });
  console.log('Connected to MongoDB');
}

module.exports = { connect };
