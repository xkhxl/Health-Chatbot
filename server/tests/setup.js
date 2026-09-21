require('dotenv').config();

const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/health-chatbot-test');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});
