const assessmentService = require('../services/assessment.service');

const createAssessment = async (req, res) => {
  try {
    const assessment = await assessmentService.createAssessment(
      req.user.userId,
      req.body
    );

    res.status(201).json({
      message: 'Assessment created successfully.',
      assessment,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create assessment.',
      error: error.message,
    });
  }
};

const getAssessments = async (req, res) => {
  try {
    const assessments = await assessmentService.getAssessments(
      req.user.userId
    );

    res.status(200).json({
      assessments,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch assessments.',
      error: error.message,
    });
  }
};

const getAssessmentById = async (req, res) => {
  try {
    const assessment = await assessmentService.getAssessmentById(
      req.user.userId,
      req.params.id
    );

    if (!assessment) {
      return res.status(404).json({
        message: 'Assessment not found.',
      });
    }

    res.status(200).json({
      assessment,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch assessment.',
      error: error.message,
    });
  }
};

const saveAIResult = async (req, res) => {
  try {
    const assessment = await assessmentService.saveAIResult(
      req.user.userId,
      req.params.id,
      req.body.aiResult
    );

    if (!assessment) {
      return res.status(404).json({
        message: 'Assessment not found.',
      });
    }

    res.status(200).json({
      message: 'AI result saved successfully.',
      assessment,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to save AI result.',
      error: error.message,
    });
  }
};

module.exports = {
  createAssessment,
  getAssessments,
  getAssessmentById,
  saveAIResult,
};