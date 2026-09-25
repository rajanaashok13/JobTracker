const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to protect routes and verify JWT token
 */
const protect = async (req, res, next) => {
  let token;

  // Check Authorization header for Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header (format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, token missing'
        });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_dev');

      // Find user by id from decoded token payload, exclude password
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User belonging to this token no longer exists'
        });
      }

      // Attach user to request object
      req.user = user;
      return next();
    } catch (error) {
      console.error('Authentication Error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token invalid or expired'
      });
    }
  }

  // If no token is provided
  return res.status(401).json({
    success: false,
    message: 'Not authorized, please log in with a valid token'
  });
};

module.exports = { protect };
