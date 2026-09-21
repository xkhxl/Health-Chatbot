require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/database');

// Start the server
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
