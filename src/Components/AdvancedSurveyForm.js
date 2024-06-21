import React, { useState } from 'react';
import useForm from './useForm';
import './App.css';

const validate = (values) => {
  let errors = {};

  if (!values.fullName) {
    errors.fullName = 'Full Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.surveyTopic) {
    errors.surveyTopic = 'Survey Topic is required';
  }

  if (values.surveyTopic === 'Technology') {
    if (!values.favoriteLanguage) {
      errors.favoriteLanguage = 'Favorite Programming Language is required';
    }
    if (!values.yearsOfExperience) {
      errors.yearsOfExperience = 'Years of Experience is required';
    }
  }

  if (values.surveyTopic === 'Health') {
    if (!values.exerciseFrequency) {
      errors.exerciseFrequency = 'Exercise Frequency is required';
    }
    if (!values.dietPreference) {
      errors.dietPreference = 'Diet Preference is required';
    }
  }

  if (values.surveyTopic === 'Education') {
    if (!values.highestQualification) {
      errors.highestQualification = 'Highest Qualification is required';
    }
    if (!values.fieldOfStudy) {
      errors.fieldOfStudy = 'Field of Study is required';
    }
  }

  if (!values.feedback) {
    errors.feedback = 'Feedback is required';
  } else if (values.feedback.length < 50) {
    errors.feedback = 'Feedback must be at least 50 characters';
  }

  return errors;
};

const AdvancedSurveyForm = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [surveyResponses, setSurveyResponses] = useState({});
  const { values, errors, handleChange, handleSubmit, setFieldValue } = useForm(
    (values) => {
      setSubmittedData(values);
      fetchQuestions(values.surveyTopic);
    },
    validate
  );

  const fetchQuestions = async (topic) => {
    try {
      if (!topic) return;

      const response = await fetch(`https://dynamic-form-level-three-backend.vercel.app/api/questions?surveyType=${topic}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const questionsForTopic = await response.json();

      setAdditionalQuestions(questionsForTopic);
      initializeSurveyResponses(questionsForTopic);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const initializeSurveyResponses = (questions) => {
    const initialResponses = {};
    questions.forEach((question) => {
      initialResponses[question.id] = '';
    });
    setSurveyResponses(initialResponses);
  };

  const handleSurveyResponseChange = (event, questionId) => {
    const { value } = event.target;
    setSurveyResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };

  return (
    <div className="form-container">
      <h1>Advanced Survey Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={values.fullName || ''}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="surveyTopic">Survey Topic:</label>
          <select
            id="surveyTopic"
            name="surveyTopic"
            value={values.surveyTopic || ''}
            onChange={handleChange}
          >
            <option value="">Select Topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <p className="error">{errors.surveyTopic}</p>}
        </div>

        {values.surveyTopic === 'Technology' && (
          <div>
            <div className="form-group">
              <label htmlFor="favoriteLanguage">Favorite Programming Language:</label>
              <select
                id="favoriteLanguage"
                name="favoriteLanguage"
                value={values.favoriteLanguage || ''}
                onChange={handleChange}
              >
                <option value="">Select Language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
              {errors.favoriteLanguage && <p className="error">{errors.favoriteLanguage}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="yearsOfExperience">Years of Experience:</label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={values.yearsOfExperience || ''}
                onChange={handleChange}
              />
              {errors.yearsOfExperience && <p className="error">{errors.yearsOfExperience}</p>}
            </div>
          </div>
        )}

        {values.surveyTopic === 'Health' && (
          <div>
            <div className="form-group">
              <label htmlFor="exerciseFrequency">Exercise Frequency:</label>
              <select
                id="exerciseFrequency"
                name="exerciseFrequency"
                value={values.exerciseFrequency || ''}
                onChange={handleChange}
              >
                <option value="">Select Frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
              {errors.exerciseFrequency && <p className="error">{errors.exerciseFrequency}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="dietPreference">Diet Preference:</label>
              <select
                id="dietPreference"
                name="dietPreference"
                value={values.dietPreference || ''}
                onChange={handleChange}
              >
                <option value="">Select Preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
              {errors.dietPreference && <p className="error">{errors.dietPreference}</p>}
            </div>
          </div>
        )}

        {values.surveyTopic === 'Education' && (
          <div>
            <div className="form-group">
              <label htmlFor="highestQualification">Highest Qualification:</label>
              <select
                id="highestQualification"
                name="highestQualification"
                value={values.highestQualification || ''}
                onChange={handleChange}
              >
                <option value="">Select Qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.highestQualification && (
                <p className="error">{errors.highestQualification}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="fieldOfStudy">Field of Study:</label>
              <input
                type="text"
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={values.fieldOfStudy || ''}
                onChange={handleChange}
              />
              {errors.fieldOfStudy && <p className="error">{errors.fieldOfStudy}</p>}
            </div>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            value={values.feedback || ''}
            onChange={handleChange}
          />
          {errors.feedback && <p className="error">{errors.feedback}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="summary show">
          <h2>Summary</h2>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Survey Topic:</strong> {submittedData.surveyTopic}</p>
          {console.log(additionalQuestions)}
          {values.surveyTopic === 'Technology' && (
            <div>
              <h3>Technology Section</h3>
              <p><strong>Favorite Programming Language:</strong> {submittedData.favoriteLanguage}</p>
              <p><strong>Years of Experience:</strong> {submittedData.yearsOfExperience}</p>
            </div>
          )}

          {values.surveyTopic === 'Health' && (
            <div>
              <h3>Health Section</h3>
              <p><strong>Exercise Frequency:</strong> {submittedData.exerciseFrequency}</p>
              <p><strong>Diet Preference:</strong> {submittedData.dietPreference}</p>
            </div>
          )}

          {values.surveyTopic === 'Education' && (
            <div>
              <h3>Education Section</h3>
              <p><strong>Highest Qualification:</strong> {submittedData.highestQualification}</p>
              <p><strong>Field of Study:</strong> {submittedData.fieldOfStudy}</p>
            </div>
          )}

          <p><strong>Feedback:</strong> {submittedData.feedback}</p>
        </div>

      )}

{additionalQuestions.length > 0 && (
  <div className="additional-questions">
    {additionalQuestions.map((question) => (
      <div key={question.id} className="form-group">
        <label htmlFor={`question_${question.id}`} className="question-label">
          {question.question}
        </label>
        <textarea
          id={`question_${question.id}`}
          name={`question_${question.id}`}
          value={surveyResponses[question.id]}
          onChange={(e) => handleSurveyResponseChange(e, question.id)}
          className="question-textarea"
        />
      </div>
    ))}
  </div>
)}
    </div>
  );
};

export default AdvancedSurveyForm;
