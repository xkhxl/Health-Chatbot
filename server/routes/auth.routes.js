const express = require('express');

const protect = require('../middleware/auth.middleware');

const {
  register,
  login,
  getCurrentUser,
} = require('../controllers/auth.controller');

const router = express.Router();

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/me
router.get('/me', protect, getCurrentUser);

module.exports = router;
