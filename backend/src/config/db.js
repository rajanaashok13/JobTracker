const mongoose = require('mongoose');

/**
 * Connect to MongoDB database using Mongoose
 * The connection string is retrieved from MONGODB_URI environment variable
 */
const connectDB = async () => {
  // If already connected or connecting, return existing connection
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    const connString = process.env.MONGODB_URI;

    if (!connString) {
      console.warn('\n============================================================');
      console.warn('⚠️  Warning: MONGODB_URI is not defined in your backend/.env');
      console.warn('👉  Copy backend/.env.example to backend/.env and paste your');
      console.warn('    MongoDB Atlas connection string.');
      console.warn('============================================================\n');
      return;
    }

    const conn = await mongoose.connect(connString);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('\n============================================================');
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('👉  Make sure your IP address is whitelisted in MongoDB Atlas');
    console.error('    (Network Access -> Allow Access from Anywhere / 0.0.0.0/0)');
    console.error('    and your database username and password in .env are correct.');
    console.error('============================================================\n');
  }
};

module.exports = connectDB;
