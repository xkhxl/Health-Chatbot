const express = require('express');

const protect = require('../middleware/auth.middleware');

const {
  createAssessment,
  getAssessments,
  getAssessmentById,
  saveAIResult,
} = require('../controllers/assessment.controller');

const router = express.Router();

router.post('/', protect, createAssessment);
router.get('/', protect, getAssessments);

router.put('/:id/result', protect, saveAIResult);

router.get('/:id', protect, getAssessmentById);

module.exports = router;