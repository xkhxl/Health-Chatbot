const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },

    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
      lowercase: true,
      trim: true,
    },

    bloodGroup: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },

    symptoms: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 1000,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    severity: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    additionalInformation: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: '',
    },

    aiResult: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
