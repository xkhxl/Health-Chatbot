const Assessment = require('../models/Assessment');

const createAssessment = async (userId, assessmentData) => {
  const assessment = await Assessment.create({
    ...assessmentData,
    user: userId,
  });

  return assessment;
};

const getAssessments = async (userId) => {
  const assessments = await Assessment.find({
    user: userId,
  }).sort({ createdAt: -1 });

  return assessments;
};

const getAssessmentById = async (userId, assessmentId) => {
  const assessment = await Assessment.findOne({
    _id: assessmentId,
    user: userId,
  });

  return assessment;
};

const saveAIResult = async (userId, assessmentId, aiResult) => {
  const assessment = await Assessment.findOneAndUpdate(
    {
      _id: assessmentId,
      user: userId,
    },
    {
      aiResult,
    },
    {
      returnDocument: 'after',
    }
  );

  return assessment;
};

module.exports = {
  createAssessment,
  getAssessments,
  getAssessmentById,
  saveAIResult,
};