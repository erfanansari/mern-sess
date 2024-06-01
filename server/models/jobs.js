const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Job Schema
const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  employer: {
    type: String,
    required: true,
    trim: true
  },
  skillsRequired: {
    type: [String],  // Array of strings to list required skills
    default: []
  },
  salaryRange: {
    from: {
      type: Number,
      required: true
    },
    to: {
      type: Number,
      required: true
    }
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  employmentType: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Temporary', 'Internship'],
    required: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = Mongoose.model('Job', JobSchema);