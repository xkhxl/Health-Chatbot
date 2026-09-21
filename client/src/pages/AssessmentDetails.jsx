import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { getAssessmentById } from '../services/assessment.service';

function AssessmentDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const data = await getAssessmentById(token, id);

        setAssessment(data.assessment);
      } catch (error) {
        console.error('Failed to fetch assessment:', error);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [token, id]);

  if (loading) {
    return <p>Loading assessment...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!assessment) {
    return <p>Assessment not found.</p>;
  }

  const aiResult = assessment.aiResult;

  return (
    <div>
      <h1>Assessment Details</h1>

      <h2>Patient Information</h2>

      <p>
        <strong>Age:</strong> {assessment.age}
      </p>

      <p>
        <strong>Gender:</strong> {assessment.gender}
      </p>

      <p>
        <strong>Blood Group:</strong> {assessment.bloodGroup}
      </p>

      <p>
        <strong>Symptoms:</strong> {assessment.symptoms}
      </p>

      <p>
        <strong>Duration:</strong> {assessment.duration}
      </p>

      <p>
        <strong>Severity:</strong> {assessment.severity}/10
      </p>

      <p>
        <strong>Additional Information:</strong>{' '}
        {assessment.additionalInformation || 'None'}
      </p>

      <p>
        <strong>Created:</strong>{' '}
        {new Date(assessment.createdAt).toLocaleString()}
      </p>

      <hr />

      {!aiResult && (
        <div>
          <h2>AI Assessment</h2>

          <p>No AI result has been saved for this assessment yet.</p>
        </div>
      )}

      {aiResult?.type === 'result' && (
        <div>
          <h2>AI Assessment Result</h2>

          <h3>Possible Conditions</h3>

          {aiResult.possibleConditions.map((condition, index) => (
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
            {aiResult.advice.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Precautions</h3>

          <ul>
            {aiResult.precautions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>When to Seek Medical Attention</h3>

          <ul>
            {aiResult.whenToSeekMedicalAttention.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AssessmentDetails;
