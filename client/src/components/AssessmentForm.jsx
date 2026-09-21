import { useState } from 'react';

function AssessmentForm({ onSubmit }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState(5);
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    const numericAge = Number(age);
    const numericSeverity = Number(severity);

    if (!age) {
      return 'Please enter your age.';
    }

    if (!Number.isInteger(numericAge) || numericAge < 1 || numericAge > 120) {
      return 'Age must be a whole number between 1 and 120.';
    }

    if (!gender) {
      return 'Please select your gender.';
    }

    if (!bloodGroup) {
      return 'Please select your blood group.';
    }

    if (!symptoms.trim()) {
      return 'Please describe your symptoms.';
    }

    if (symptoms.trim().length < 3) {
      return 'Symptoms must contain at least 3 characters.';
    }

    if (!duration.trim()) {
      return 'Please enter the symptom duration.';
    }

    if (
      !Number.isInteger(numericSeverity) ||
      numericSeverity < 1 ||
      numericSeverity > 10
    ) {
      return 'Severity must be between 1 and 10.';
    }

    if (additionalInformation && additionalInformation.trim().length > 2000) {
      return 'Additional information cannot exceed 2000 characters.';
    }

    return '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');

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
      {error && <div className='error'>{error}</div>}

      <div>
        <label htmlFor='age'>Age</label>

        <input
          id='age'
          type='number'
          min='1'
          max='120'
          value={age}
          onChange={(event) => setAge(event.target.value)}
          placeholder='Enter your age'
        />
      </div>

      <div>
        <label htmlFor='gender'>Gender</label>

        <select
          id='gender'
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option value=''>Select gender</option>

          <option value='male'>Male</option>

          <option value='female'>Female</option>

          <option value='other'>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor='bloodGroup'>Blood Group</label>

        <select
          id='bloodGroup'
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

      <div>
        <label htmlFor='symptoms'>Symptoms</label>

        <textarea
          id='symptoms'
          value={symptoms}
          onChange={(event) => setSymptoms(event.target.value)}
          placeholder='Describe your symptoms...'
          rows='4'
        />
      </div>

      <div>
        <label htmlFor='duration'>How long have you had these symptoms?</label>

        <input
          id='duration'
          type='text'
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          placeholder='e.g. 2 days'
        />
      </div>

      <div>
        <label htmlFor='severity'>Severity: {severity}/10</label>

        <input
          id='severity'
          type='range'
          min='1'
          max='10'
          value={severity}
          onChange={(event) => setSeverity(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor='additionalInformation'>Additional Information</label>

        <textarea
          id='additionalInformation'
          value={additionalInformation}
          onChange={(event) => setAdditionalInformation(event.target.value)}
          placeholder='Anything else you think is important...'
          rows='4'
        />
      </div>

      <button type='submit'>Start Assessment</button>
    </form>
  );
}

export default AssessmentForm;
