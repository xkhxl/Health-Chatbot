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
    },

    gender: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    symptoms: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    severity: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    additionalInformation: {
      type: String,
      default: '',
    },

    aiResult: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;