const aiService = require('../services/ai.service');

const testOpenRouter = async (req, res) => {
  try {
    const { message } = req.body;

    const result = await aiService.testOpenRouter(message);

    res.status(200).json({
      message: 'OpenRouter connection successful.',
      result,
    });
  } catch (error) {
    console.error('OpenRouter error:', error);

    res.status(500).json({
      message: 'OpenRouter request failed.',
      error: error.message,
    });
  }
};

const analyzeConversation = async (req, res) => {
  try {
    const { messages } = req.body;

    const result = await aiService.analyzeConversation(messages);

    res.status(200).json({
      message: 'AI analysis successful.',
      result,
    });
  } catch (error) {
    console.error('OpenRouter error:', error);

    res.status(500).json({
      message: 'AI analysis failed.',
      error: error.message,
    });
  }
};

const testStructuredOutput = async (req, res) => {
  try {
    const result = await aiService.testStructuredOutput();

    res.status(200).json({
      message: 'Structured AI response successful.',
      result,
    });
  } catch (error) {
    console.error('OpenRouter error:', error);

    res.status(500).json({
      message: 'Structured AI response failed.',
      error: error.message,
    });
  }
};

module.exports = {
  testOpenRouter,
  analyzeConversation,
    testStructuredOutput,
};