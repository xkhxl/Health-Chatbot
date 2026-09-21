import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='home-page'>
      <section className='hero'>
        <div className='hero-content'>
          <p className='hero-label'>AI-POWERED HEALTH ASSESSMENT</p>

          <h1>
            Understand your symptoms.
            <br />
            Get guided insights.
          </h1>

          <p className='hero-description'>
            Health ChatBot helps you assess your symptoms through an interactive
            AI conversation and keeps your assessment history in one place.
          </p>

          <div className='hero-actions'>
            <Link to='/assessment' className='button button-primary'>
              Start Assessment
            </Link>

            <Link to='/history' className='button button-secondary'>
              View History
            </Link>
          </div>
        </div>
      </section>

      <section className='feature-grid'>
        <div className='feature-card'>
          <h3>Interactive Assessment</h3>

          <p>
            Answer follow-up questions so the assessment can gather more
            relevant information.
          </p>
        </div>

        <div className='feature-card'>
          <h3>AI Insights</h3>

          <p>
            Receive possible conditions, general advice, precautions, and
            warning signs.
          </p>
        </div>

        <div className='feature-card'>
          <h3>Assessment History</h3>

          <p>
            Your completed assessments and AI results remain available for later
            reference.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
