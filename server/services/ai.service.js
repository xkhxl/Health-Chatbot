const { OpenRouter } = require('@openrouter/sdk');

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const MODEL = 'openrouter/free';

const sleep = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

const testOpenRouter = async (message) => {
  const response = await openrouter.chat.send({
    chatRequest: {
      model: MODEL,

      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    },
  });

  return response.choices[0].message.content;
};

const sendAIRequest = async (messages) => {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await openrouter.chat.send({
        chatRequest: {
          model: MODEL,

          messages,

          responseFormat: {
            type: 'json_object',
          },
        },
      });

      return response;
    } catch (error) {
      console.error(
        `OpenRouter request failed (attempt ${attempt}/${maxAttempts}):`,
        error.message,
      );

      if (attempt === maxAttempts) {
        throw error;
      }

      await sleep(1500 * attempt);
    }
  }
};

const analyzeConversation = async (messages) => {
  const systemMessage = {
    role: 'system',
    content: `
You are the AI health assessment assistant for Health-ChatBot.

Your job is to conduct an interactive health assessment based on information provided by the patient.

IMPORTANT:

- You are not a doctor.
- Never claim to provide a definitive diagnosis.
- Identify only possible conditions based on the information provided.
- Do not invent symptoms, medical history, or other information.
- Ask follow-up questions when important information is missing.
- Ask only ONE question at a time.
- Do not ask a question that has already been answered.
- Once you have enough information, provide a final assessment.
- If the information suggests a potentially serious or emergency condition, prioritize appropriate medical attention.
- Keep responses concise and understandable.

RESPONSE FORMAT IS STRICT:

You MUST return ONLY valid JSON.

Do NOT return Markdown.
Do NOT return explanations outside the JSON.
Do NOT return text such as "User Safety: safe".
Do NOT add any text before or after the JSON object.

There are exactly two response types.

QUESTION RESPONSE:

{
  "type": "question",
  "question": "One useful follow-up question"
}

RESULT RESPONSE:

{
  "type": "result",
  "possibleConditions": [
    {
      "name": "Possible condition",
      "likelihood": "likely",
      "reason": "Why this condition may fit the information provided"
    }
  ],
  "advice": [
    "General advice"
  ],
  "precautions": [
    "Precaution"
  ],
  "whenToSeekMedicalAttention": [
    "Situation requiring medical attention"
  ]
}

For "likelihood", use only:

- "likely"
- "possible"
- "less-likely"

For a QUESTION response:

- Include only "type" and "question".
- Do not include possibleConditions.
- Do not include advice.
- Do not include precautions.
- Do not include whenToSeekMedicalAttention.

For a RESULT response:

- Include only "type".
- Include possibleConditions.
- Include advice.
- Include precautions.
- Include whenToSeekMedicalAttention.
- Do not include question.

Remember that possible conditions are NOT definitive diagnoses.

The response MUST ALWAYS be a valid JSON object.
    `,
  };

  const response = await sendAIRequest([systemMessage, ...messages]);

  const content = response.choices[0].message.content;

  console.log('Raw AI response:', content);

  let parsed;

  try {
    parsed = JSON.parse(content);
  } catch (error) {
    throw new Error('AI returned an invalid JSON response.');
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('AI returned an invalid response.');
  }

  if (parsed.type === 'question') {
    if (typeof parsed.question !== 'string' || parsed.question.trim() === '') {
      throw new Error('AI returned an invalid question response.');
    }

    return {
      type: 'question',
      question: parsed.question,
    };
  }

  if (parsed.type === 'result') {
    if (
      !Array.isArray(parsed.possibleConditions) ||
      !Array.isArray(parsed.advice) ||
      !Array.isArray(parsed.precautions) ||
      !Array.isArray(parsed.whenToSeekMedicalAttention)
    ) {
      throw new Error('AI returned an invalid result response.');
    }

    return {
      type: 'result',
      possibleConditions: parsed.possibleConditions,
      advice: parsed.advice,
      precautions: parsed.precautions,
      whenToSeekMedicalAttention: parsed.whenToSeekMedicalAttention,
    };
  }

  throw new Error('AI returned an invalid response type.');
};

const testStructuredOutput = async () => {
  const response = await sendAIRequest([
    {
      role: 'system',

      content: `
Return ONLY valid JSON.

Return exactly this structure:

{
  "type": "question",
  "question": "string"
}
      `,
    },

    {
      role: 'user',

      content: 'The patient has a headache. Ask one useful follow-up question.',
    },
  ]);

  return response.choices[0].message.content;
};

module.exports = {
  testOpenRouter,
  analyzeConversation,
  testStructuredOutput,
};
