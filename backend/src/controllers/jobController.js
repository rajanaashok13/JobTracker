const Job = require('../models/Job');

/**
 * @desc    Get all job applications for the logged-in user with search, filter, and pagination
 * @route   GET /api/jobs
 * @access  Private
 */
const getJobs = async (req, res, next) => {
  try {
    const {
      status,
      company,
      role,
      search,
      sort = 'newest',
      page = 1,
      limit = 20
    } = req.query;

    // Base query: only jobs belonging to this user
    const query = { user: req.user._id };

    // Filter by status if provided (and not 'all')
    if (status && status !== 'all') {
      query.status = status;
    }

    // Filter by company name if provided
    if (company) {
      query.company = { $regex: company, $options: 'i' };
    }

    // Filter by job role if provided
    if (role) {
      query.jobRole = { $regex: role, $options: 'i' };
    }

    // General search across company, role, location, notes
    if (search) {
      const searchRegex = { $regex: search, $options: 'i' };
      query.$or = [
        { company: searchRegex },
        { jobRole: searchRegex },
        { location: searchRegex },
        { notes: searchRegex }
      ];
    }

    // Sorting criteria
    let sortOption = { applicationDate: -1, createdAt: -1 }; // default: newest
    if (sort === 'oldest') {
      sortOption = { applicationDate: 1, createdAt: 1 };
    } else if (sort === 'company-asc') {
      sortOption = { company: 1 };
    } else if (sort === 'company-desc') {
      sortOption = { company: -1 };
    } else if (sort === 'status') {
      sortOption = { status: 1 };
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination and total count
    const [jobs, total] = await Promise.all([
      Job.find(query).sort(sortOption).skip(skip).limit(limitNum),
      Job.countDocuments(query)
    ]);

    return res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      jobs
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get dashboard metrics & application statistics for logged-in user
 * @route   GET /api/jobs/stats
 * @access  Private
 */
const getJobStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Aggregate counts by status
    const statsData = await Job.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Format stats with default zeros
    const stats = {
      applied: 0,
      interview: 0,
      selected: 0,
      rejected: 0
    };

    statsData.forEach((item) => {
      const statusKey = item._id.toLowerCase();
      if (stats.hasOwnProperty(statusKey)) {
        stats[statusKey] = item.count;
      }
    });

    const totalApplications =
      stats.applied + stats.interview + stats.selected + stats.rejected;

    // Recent 5 applications for dashboard preview
    const recentApplications = await Job.find({ user: userId })
      .sort({ applicationDate: -1, createdAt: -1 })
      .limit(5);

    // Monthly application trend (last 6 months)
    const monthlyStats = await Job.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: {
            year: { $year: '$applicationDate' },
            month: { $month: '$applicationDate' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 6 }
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        total: totalApplications,
        applied: stats.applied,
        interview: stats.interview,
        selected: stats.selected,
        rejected: stats.rejected
      },
      recentApplications,
      monthlyStats: monthlyStats.reverse()
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single job application by ID
 * @route   GET /api/jobs/:id
 * @access  Private
 */
const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job application not found'
      });
    }

    // Ensure the application belongs to the logged-in user
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this job application'
      });
    }

    return res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new job application
 * @route   POST /api/jobs
 * @access  Private
 */
const createJob = async (req, res, next) => {
  try {
    const {
      company,
      jobRole,
      location,
      salary,
      applicationDate,
      status,
      jobUrl,
      notes
    } = req.body;

    // Validate required fields
    if (!company || !jobRole) {
      return res.status(400).json({
        success: false,
        message: 'Company name and Job role are required'
      });
    }

    // Create job application with reference to logged-in user
    const job = await Job.create({
      user: req.user._id,
      company,
      jobRole,
      location: location || 'Remote',
      salary: salary || 'Not specified',
      applicationDate: applicationDate || Date.now(),
      status: status || 'Applied',
      jobUrl: jobUrl || '',
      notes: notes || ''
    });

    return res.status(201).json({
      success: true,
      message: 'Job application created successfully',
      job
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing job application
 * @route   PUT /api/jobs/:id
 * @access  Private
 */
const updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job application not found'
      });
    }

    // Verify ownership
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this job application'
      });
    }

    // Update with allowed fields
    const {
      company,
      jobRole,
      location,
      salary,
      applicationDate,
      status,
      jobUrl,
      notes
    } = req.body;

    job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        company,
        jobRole,
        location,
        salary,
        applicationDate,
        status,
        jobUrl,
        notes
      },
      {
        new: true,
        runValidators: true
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Job application updated successfully',
      job
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a job application
 * @route   DELETE /api/jobs/:id
 * @access  Private
 */
const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job application not found'
      });
    }

    // Verify ownership
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job application'
      });
    }

    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Job application removed successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  getJobStats,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};
