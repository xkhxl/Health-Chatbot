const User = require('../models/User');

// Import jsonwebtoken to create JWTs for authenticated users
const jwt = require('jsonwebtoken');

// Controller to register a new user
const register = async (req, res) => {
  try {
    // Extract user details sent in the request body
    const { name, email, password } = req.body;

    // Create new user in database (model should handle hashing password)
    const user = await User.create({ name, email, password });

    // Return created user info (omit sensitive fields like password)
    res.status(201).json({
      message: 'User registered successfully.',
      user: { id: user._1, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to register user.',
      error: error.message,
    });
  }
};

// Controller to authenticate an existing user and return a JWT
const login = async (req, res) => {
  try {
    // Extract credentials from request
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    // Verify provided password using model instance method
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    // Create JWT containing the user id; secret should be stored in env
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Return token and basic user info
    res.status(200).json({
      message: 'Login successful.',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to login.',
      error: error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch current user.',
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
};
