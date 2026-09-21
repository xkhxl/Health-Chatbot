import { useContext, useState } from 'react';

import AssessmentForm from '../components/AssessmentForm';

import { AuthContext } from '../context/AuthContext';

import { createAssessment, saveAIResult } from '../services/assessment.service';
import { analyzeConversation } from '../services/ai.service';

function Assessment() {
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [assessment, setAssessment] = useState(null);

  const [aiResponse, setAiResponse] = useState(null);

  const [messages, setMessages] = useState([]);

  const [answer, setAnswer] = useState('');

  const handleAssessmentSubmit = async (assessmentData) => {
    setError('');
    setLoading(true);

    try {
      // 1. Save the assessment to MongoDB
      const assessmentResponse = await createAssessment(token, assessmentData);

      console.log('Assessment created:', assessmentResponse);

      setAssessment(assessmentResponse.assessment);

      // 2. Build the initial message for the AI
      const initialMessage = {
        role: 'user',
        content: `
Patient information:

Age: ${assessmentData.age}

Gender: ${assessmentData.gender}

Blood group: ${assessmentData.bloodGroup}

Symptoms: ${assessmentData.symptoms}

Duration: ${assessmentData.duration}

Severity: ${assessmentData.severity}/10

Additional information: ${assessmentData.additionalInformation || 'None'}

Begin the health assessment.

Ask one useful follow-up question if more information is needed.
        `.trim(),
      };

      // 3. Store the initial message
      setMessages([initialMessage]);

      // 4. Send the initial message to the AI
      const aiResponse = await analyzeConversation(token, [initialMessage]);

      console.log('AI response:', aiResponse);

      // 5. Store the AI response
      setAiResponse(aiResponse.result);

      // 6. If the AI returned a question,
      //    add that question to the conversation
      if (aiResponse.result.type === 'question') {
        const aiMessage = {
          role: 'assistant',
          content: aiResponse.result.question,
        };

        setMessages([initialMessage, aiMessage]);
      }
    } catch (error) {
      console.error('Assessment/AI process failed:', error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();

    if (!answer.trim()) {
      return;
    }

    setError('');
    setLoading(true);

    try {
      // 1. Create the user's answer message
      const answerMessage = {
        role: 'user',
        content: answer.trim(),
      };

      // 2. Add the answer to the existing conversation
      const updatedMessages = [...messages, answerMessage];

      // 3. Send the entire conversation to the AI
      const aiResponse = await analyzeConversation(token, updatedMessages);

      console.log('AI response:', aiResponse);

      // 4. Store the AI response
      setAiResponse(aiResponse.result);

      // 5. If the AI asked another question,
      //    add that question to the conversation
      if (aiResponse.result.type === 'question') {
        const aiMessage = {
          role: 'assistant',
          content: aiResponse.result.question,
        };

        setMessages([...updatedMessages, aiMessage]);
      } else if (aiResponse.result.type === 'result') {
        // Save the final AI result to MongoDB
        const savedAssessment = await saveAIResult(
          token,
          assessment._id,
          aiResponse.result,
        );

        console.log('AI result saved:', savedAssessment);

        // Update the assessment in React state
        setAssessment(savedAssessment.assessment);

        // The final result does not need to be
        // added to the conversation as raw JSON.
        setMessages(updatedMessages);
      }

      // 6. Clear the answer box
      setAnswer('');
    } catch (error) {
      console.error('AI answer process failed:', error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Health Assessment</h1>

      {error && <p>{error}</p>}

      {!assessment && <AssessmentForm onSubmit={handleAssessmentSubmit} />}

      {loading && <p>Processing...</p>}

      {assessment && (
        <div>
          <h2>Assessment</h2>

          <p>
            <strong>Assessment ID:</strong> {assessment._id}
          </p>

          <p>
            <strong>Symptoms:</strong> {assessment.symptoms}
          </p>
        </div>
      )}

      {messages.length > 0 && (
        <div>
          <h2>Conversation</h2>

          {messages.map((message, index) => (
            <div key={index}>
              <strong>{message.role === 'user' ? 'You' : 'AI'}:</strong>

              <p>{message.content}</p>
            </div>
          ))}
        </div>
      )}

      {aiResponse?.type === 'question' && (
        <form onSubmit={handleAnswerSubmit}>
          <div>
            <label htmlFor='answer'>Your Answer</label>

            <br />

            <textarea
              id='answer'
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder='Type your answer...'
              rows='4'
            />
          </div>

          <br />

          <button type='submit' disabled={loading || !answer.trim()}>
            {loading ? 'Sending...' : 'Submit Answer'}
          </button>
        </form>
      )}

      {aiResponse?.type === 'result' && (
        <div>
          <h2>AI Assessment Result</h2>

          <h3>Possible Conditions</h3>

          {aiResponse.possibleConditions.map((condition, index) => (
            <div key={index}>
              <h4>{condition.name}</h4>

              <p>
                <strong>Likelihood:</strong> {condition.likelihood}
              </p>

              <p>{condition.reason}</p>
            </div>
          ))}

          <h3>Advice</h3>

          <ul>
            {aiResponse.advice.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Precautions</h3>

          <ul>
            {aiResponse.precautions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>When to Seek Medical Attention</h3>

          <ul>
            {aiResponse.whenToSeekMedicalAttention.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Assessment;
