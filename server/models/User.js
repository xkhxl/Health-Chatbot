const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schema creation
const userSchema = new mongoose.Schema(
  {
    // Name
    name: {
      type: String,
      required: true,
      trim: true, // To remove whitespaces
    },

    email: {
      type: String,
      required: true,
      unique: true, // No email duplication
      lowercase: true, // To convert email to lowercase
      trim: true,
    },

    // Not storing the password in plain text for security reasons. It should be hashed before saving to the database.
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  // Helps to automatically manage createdAt and updatedAt fields in the database.
  {
    timestamps: true,
  },
);

// Pre-Save Mongoose middleware hook - "Before a user is saved to MongoDB, encrypt the password"
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 12);
});

// Compares the submitted password against stored hash.
userSchema.methods.comparePassword = async function (candidatePassword) { 
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
