# Health ChatBot

A simple AI-powered health assessment application built using React, Node.js, Express, MongoDB, and OpenRouter.

The application allows users to create an account, enter their symptoms and health information, answer AI-generated follow-up questions, and receive a structured health assessment. Completed assessments are saved and can be viewed later.

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Health assessment form
- Interactive AI follow-up questions
- Possible conditions and general health advice
- Assessment history
- Saved assessment results
- Form validation
- Automated API tests
- MongoDB Atlas database
- Deployed frontend and backend

## Tech Stack

### Frontend
- React
- Vite
- React Router
- CSS

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt

### AI
- OpenRouter API

### Testing
- Vitest
- Supertest

## Project Structure

```text
Health-Chatbot/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   ├── app.js
│   └── server.js
│
└── README.md
