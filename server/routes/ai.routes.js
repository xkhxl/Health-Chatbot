const express = require('express');

const protect = require('../middleware/auth.middleware');

const {
  testOpenRouter,
  analyzeConversation,
  testStructuredOutput,
} = require('../controllers/ai.controller');

const router = express.Router();

router.post('/test', testOpenRouter);

router.post('/analyze', protect, analyzeConversation);

router.post('/test-structured', testStructuredOutput);

module.exports = router;
