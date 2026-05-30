const express = require('express');
const router = express.Router();
const { generateSummary, generateObjective, analyzeResume } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/generate-summary', generateSummary);
router.post('/generate-objective', generateObjective);
router.post('/analyze-resume', analyzeResume);

module.exports = router;
