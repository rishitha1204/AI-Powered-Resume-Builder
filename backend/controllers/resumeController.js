const Resume = require('../models/Resume');

// @desc   Create resume
// @route  POST /api/resume/create
const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      userId: req.user._id,
      ...req.body
    });
    res.status(201).json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc   Get all resumes for user
// @route  GET /api/resume/all
const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json({ success: true, data: resumes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc   Get single resume
// @route  GET /api/resume/:id
const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }
    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc   Update resume
// @route  PUT /api/resume/update/:id
const updateResume = async (req, res) => {
  try {
    let resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc   Delete resume
// @route  DELETE /api/resume/delete/:id
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }
    await resume.deleteOne();
    res.json({ success: true, message: 'Resume deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createResume, getAllResumes, getResume, updateResume, deleteResume };
