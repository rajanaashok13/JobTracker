const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobStats,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

// All job routes require JWT authentication
router.use(protect);

// Dashboard statistics (placed before :id route)
router.get('/stats', getJobStats);

// Application list and creation
router.route('/')
  .get(getJobs)
  .post(createJob);

// Single application operations
router.route('/:id')
  .get(getJobById)
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;
