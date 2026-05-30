const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'My Resume'
  },
  template: {
    type: String,
    enum: ['modern', 'minimal', 'creative', 'corporate'],
    default: 'modern'
  },
  themeColor: {
    type: String,
    default: '#6366f1'
  },
  personalInfo: {
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    portfolio: { type: String, default: '' },
    profilePhoto: { type: String, default: '' },
    summary: { type: String, default: '' }
  },
  education: [{
    college: { type: String, default: '' },
    degree: { type: String, default: '' },
    branch: { type: String, default: '' },
    cgpa: { type: String, default: '' },
    startYear: { type: String, default: '' },
    endYear: { type: String, default: '' }
  }],
  skills: [{ type: String }],
  experience: [{
    company: { type: String, default: '' },
    role: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, default: '' }
  }],
  projects: [{
    title: { type: String, default: '' },
    technologies: { type: String, default: '' },
    description: { type: String, default: '' },
    githubLink: { type: String, default: '' },
    liveLink: { type: String, default: '' }
  }],
  certifications: [{
    name: { type: String, default: '' },
    issuer: { type: String, default: '' },
    date: { type: String, default: '' },
    link: { type: String, default: '' }
  }],
  achievements: [{
    title: { type: String, default: '' },
    description: { type: String, default: '' }
  }],
  atsScore: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', ResumeSchema);
