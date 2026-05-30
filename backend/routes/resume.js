const express = require('express');
const router = express.Router();
const { createResume, getAllResumes, getResume, updateResume, deleteResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/auth');

router.use(protect); // All resume routes require auth

router.post('/create', createResume);
router.get('/all', getAllResumes);
router.get('/:id', getResume);
router.put('/update/:id', updateResume);
router.delete('/delete/:id', deleteResume);

module.exports = router;
