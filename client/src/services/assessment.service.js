const API_URL = 'http://localhost:3000/api';

const createAssessment = async (token, assessmentData) => {
  const response = await fetch(`${API_URL}/assessments`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(assessmentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create assessment.');
  }

  return data;
};

const getAssessments = async (token) => {
  const response = await fetch(`${API_URL}/assessments`, {
    method: 'GET',

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch assessments.');
  }

  return data;
};

const getAssessmentById = async (token, assessmentId) => {
  const response = await fetch(`${API_URL}/assessments/${assessmentId}`, {
    method: 'GET',

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch assessment.');
  }

  return data;
};

const saveAIResult = async (token, assessmentId, aiResult) => {
  const response = await fetch(
    `${API_URL}/assessments/${assessmentId}/result`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        aiResult,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to save AI result.');
  }

  return data;
};

export { createAssessment, getAssessments, getAssessmentById, saveAIResult };
