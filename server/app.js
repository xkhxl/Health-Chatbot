const express = require('express');
const cors = require('cors');

const protect = require('./middleware/auth.middleware');
const authRoutes = require('./routes/auth.routes');
const assessmentRoutes = require('./routes/assessment.routes');
const aiRoutes = require('./routes/ai.routes');

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://health-chatbot-1-4sw5.onrender.com',
    ],
  }),
);

app.use(express.json());

app.use('/api/ai', aiRoutes);

// Check the health of the API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Health ChatBot API is running.',
  });
});

app.get('/api/protected', protect, (req, res) => {
  res.json({
    message: 'You have access to a protected route.',
    user: req.user,
  });
});

app.use('/api/auth', authRoutes); // Use the auth routes for authentication-related endpoints
app.use('/api/assessments', assessmentRoutes); // Use the assessment routes for assessment-related endpoints

module.exports = app;
