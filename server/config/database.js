const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use the MONGODB_URI from environment variables to connect to the database
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
