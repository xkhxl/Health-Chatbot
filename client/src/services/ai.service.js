const API_URL = 'http://localhost:3000/api';

const analyzeConversation = async (token, messages) => {
  const response = await fetch(`${API_URL}/ai/analyze`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      messages,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'AI analysis failed.');
  }

  return data;
};

export { analyzeConversation };