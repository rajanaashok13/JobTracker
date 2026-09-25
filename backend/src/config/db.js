const mongoose = require('mongoose');

/**
 * Connect to MongoDB database using Mongoose
 * The connection string is retrieved from MONGODB_URI environment variable
 */
let cachedPromise = null;

/**
 * Connect to MongoDB database using Mongoose
 * Uses cached connection promise to prevent race conditions during serverless cold starts.
 */
const connectDB = async () => {
  // If already connected, return immediately
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If already connecting, return the in-flight promise
  if (cachedPromise) {
    return cachedPromise;
  }

  const connString = process.env.MONGODB_URI;

  if (!connString) {
    console.error('❌ MONGODB_URI is not defined in environment variables');
    throw new Error('MONGODB_URI is not defined');
  }

  const opts = {
    bufferCommands: false, // Fail fast instead of hanging requests indefinitely
    serverSelectionTimeoutMS: 8000, // 8 second timeout
    connectTimeoutMS: 10000
  };

  cachedPromise = mongoose.connect(connString, opts)
    .then((mongooseInstance) => {
      console.log(`✅ MongoDB Connected: ${mongooseInstance.connection.host}`);
      return mongooseInstance.connection;
    })
    .catch((err) => {
      cachedPromise = null; // Reset so next request can retry
      console.error(`❌ MongoDB Connection Error: ${err.message}`);
      throw err;
    });

  return cachedPromise;
};

module.exports = connectDB;
