import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getAssessments } from '../services/assessment.service';

function History() {
  const { token } = useContext(AuthContext);

  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const data = await getAssessments(token);

        setAssessments(data.assessments);
      } catch (error) {
        console.error('Failed to fetch assessments:', error);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [token]);

  if (loading) {
    return <p>Loading assessment history...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Assessment History</h1>

      {assessments.length === 0 ? (
        <p>No assessments found.</p>
      ) : (
        assessments.map((assessment) => (
          <div key={assessment._id}>
            <h2>
              <Link to={`/history/${assessment._id}`}>
                {assessment.symptoms}
              </Link>
            </h2>

            <p>Date: {new Date(assessment.createdAt).toLocaleString()}</p>

            <p>Severity: {assessment.severity}/10</p>

            <p>Duration: {assessment.duration}</p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default History;
