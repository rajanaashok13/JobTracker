const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Job application must belong to a user']
    },
    company: {
      type: String,
      required: [true, 'Please provide the company name'],
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    jobRole: {
      type: String,
      required: [true, 'Please provide the job role / title'],
      trim: true,
      maxlength: [100, 'Job role cannot exceed 100 characters']
    },
    location: {
      type: String,
      trim: true,
      default: 'Remote'
    },
    salary: {
      type: String,
      trim: true,
      default: 'Not specified'
    },
    applicationDate: {
      type: Date,
      default: Date.now,
      required: [true, 'Please provide the application date']
    },
    status: {
      type: String,
      enum: {
        values: ['Applied', 'Interview', 'Selected', 'Rejected'],
        message: '{VALUE} is not a supported status. Must be Applied, Interview, Selected, or Rejected.'
      },
      default: 'Applied'
    },
    jobUrl: {
      type: String,
      trim: true,
      default: ''
    },
    notes: {
      type: String,
      trim: true,
      default: '',
      maxlength: [2000, 'Notes cannot exceed 2000 characters']
    }
  },
  {
    timestamps: true
  }
);

// Index to optimize user queries sorted by application date
jobSchema.index({ user: 1, applicationDate: -1 });
jobSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Job', jobSchema);
