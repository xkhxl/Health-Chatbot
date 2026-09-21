import { useState } from 'react';

function AssessmentForm({ onSubmit }) {
  // Store the patient's basic details and symptom information before submission.
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState(5);
  const [additionalInformation, setAdditionalInformation] = useState('');

  // Send the completed questionnaire to the parent component for assessment processing.
  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      age,
      gender,
      bloodGroup,
      symptoms,
      duration,
      severity,
      additionalInformation,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Demographic information helps provide context for the medical assessment. */}
      <div>
        <label>Age</label>
        <br />
        <input
          type='number'
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Gender</label>
        <br />
        <select
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option value=''>Select gender</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>
      </div>

      <br />

      <div>
        <label>Blood Group</label>
        <br />
        <select
          value={bloodGroup}
          onChange={(event) => setBloodGroup(event.target.value)}
        >
          <option value=''>Select blood group</option>
          <option value='A+'>A+</option>
          <option value='A-'>A-</option>
          <option value='B+'>B+</option>
          <option value='B-'>B-</option>
          <option value='AB+'>AB+</option>
          <option value='AB-'>AB-</option>
          <option value='O+'>O+</option>
          <option value='O-'>O-</option>
        </select>
      </div>

      <br />

      {/* Symptoms section: collect a free-text description of the patient's reported issue(s). */}
      <div>
        <label>Symptoms</label>
        <br />
        <textarea
          value={symptoms}
          onChange={(event) => setSymptoms(event.target.value)}
          placeholder='Describe your symptoms...'
        />
      </div>

      <br />

      {/* Duration section: capture how long the symptoms have been present to help contextualize the assessment. */}
      <div>
        <label>How long have you had these symptoms?</label>
        <br />
        <input
          type='text'
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          placeholder='e.g. 2 days'
        />
      </div>

      <br />

      {/* Self-reported severity allows the user to rate discomfort on a scale from 1 to 10. */}
      <div>
        <label>Severity: {severity}/10</label>
        <br />
        <input
          type='range'
          min='1'
          max='10'
          value={severity}
          onChange={(event) => setSeverity(event.target.value)}
        />
      </div>

      <br />

      {/* Additional context can help the assessment model interpret the case more accurately. */}
      <div>
        <label>Additional Information</label>
        <br />
        <textarea
          value={additionalInformation}
          onChange={(event) => setAdditionalInformation(event.target.value)}
          placeholder='Anything else you think is important...'
        />
      </div>

      <br />

      <button type='submit'>Start Assessment</button>
    </form>
  );
}

export default AssessmentForm;
