const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

const path = require('path');

// Load environment variables from .env file
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Initialize express app
const app = express();

// CORS configuration - allow frontend development server and production client URL
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, postman) or Vercel domains
      if (!origin || allowedOrigins.includes(origin) || (origin && origin.endsWith('.vercel.app')) || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Ensure DB is connected for serverless invocations (bypass for health/root)
app.use(async (req, res, next) => {
  if (req.path === '/' || req.path === '/api/health') {
    return next();
  }

  try {
    await connectDB();
    next();
  } catch (err) {
    return res.status(503).json({
      success: false,
      message: 'Database connection failed. Please ensure MongoDB Atlas Network Access has IP 0.0.0.0/0 allowed.',
      error: err.message
    });
  }
});

// Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logger in development
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  app.use(morgan('dev'));
}

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to JobTrack API - Job Application Management System',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me'
      },
      jobs: {
        getAll: 'GET /api/jobs',
        stats: 'GET /api/jobs/stats',
        getById: 'GET /api/jobs/:id',
        create: 'POST /api/jobs',
        update: 'PUT /api/jobs/:id',
        delete: 'DELETE /api/jobs/:id'
      }
    }
  });
});

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Define PORT and start listening (only when running standalone, not inside Vercel serverless)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;

  const server = app.listen(PORT, () => {
    console.log(`🚀 JobTrack server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
    server.close(() => process.exit(1));
  });
}

module.exports = app;
