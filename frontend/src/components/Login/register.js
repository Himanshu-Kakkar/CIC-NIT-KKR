import React, { useState, useEffect } from 'react';
import './login.css'

const Registration = () => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Reset year when course changes
  useEffect(() => {
    setYear('');
  }, [course]);

  // Update email when roll number changes
  useEffect(() => {
    if (rollNumber.length === 9) {
      setEmailId(`${rollNumber}@nitkkr.ac.in`);
    }
  }, [rollNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    
    if (!fullName) {
      errors.fullName = 'Please enter your full name';
    }
    
    if (!mobileNumber) {
      errors.mobileNumber = 'Please enter your mobile number';
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      errors.mobileNumber = 'Mobile number must be 10 digits';
    }

    if (!rollNumber) {
      errors.rollNumber = 'Please enter your roll number';
    } else if (!/^\d{9}$/.test(rollNumber)) {
      errors.rollNumber = 'Roll number must be 9 digits';
    }
    
    if (!emailId) {
      errors.emailId = 'Please enter your email address';
    } else if (!/^\d{9}@nitkkr\.ac\.in$/.test(emailId)) {
      errors.emailId = 'Please enter a valid NIT KKR email address (e.g., 523110014@nitkkr.ac.in)';
    }
    
    if (!course) {
      errors.course = 'Please select your course';
    }
    
    if (!year) {
      errors.year = 'Please select your year';
    }
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      // Handle registration logic
      console.log({
        fullName,
        mobileNumber,
        rollNumber,
        emailId,
        course,
        year
      });
      
      // Redirect to login page
      window.location.href = '/login';
    }
  };

  const isYearDisabled = (yearValue) => {
    if (!course) return false;
    
    const yearNum = parseInt(yearValue);
    
    // For MBA, M.Sc, M.Tech - only 1st and 2nd year allowed
    if (['MBA', 'M.Sc', 'M.Tech'].includes(course)) {
      return yearNum > 2;
    }
    
    // For MCA - up to 3rd year allowed
    if (course === 'MCA') {
      return yearNum > 3;
    }
    
    // For B.Tech - all years allowed
    return false;
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <div className="login-form">
          <h2 className="label">Registration Form</h2>
          
          <div className="group">
            <label htmlFor="fullName" className="label">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
            {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
          </div>
          
          <div className="group">
            <label htmlFor="rollNumber" className="label">Roll Number</label>
            <input
              type="text"
              id="rollNumber"
              className="input"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="Enter your roll number"
              maxLength={9}
            />
            {formErrors.rollNumber && <span className="error-message">{formErrors.rollNumber}</span>}
          </div>
          
          <div className="group">
            <label htmlFor="mobileNumber" className="label">Mobile Number</label>
            <input
              type="tel"
              id="mobileNumber"
              className="input"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter your mobile number"
            />
            {formErrors.mobileNumber && <span className="error-message">{formErrors.mobileNumber}</span>}
          </div>
          
          <div className="group">
            <label htmlFor="emailId" className="label">College Email ID</label>
            <input
              type="email"
              id="emailId"
              className="input"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your email address"
              readOnly
            />
            {formErrors.emailId && <span className="error-message">{formErrors.emailId}</span>}
          </div>
          
          <div className="group">
            <label htmlFor="course" className="label">Course</label>
            <select
              id="course"
              className="input"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">Select your course</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MCA">MCA</option>
              <option value="M.Sc">M.Sc</option>
              <option value="MBA">MBA</option>
            </select>
            {formErrors.course && <span className="error-message">{formErrors.course}</span>}
          </div>
          
          <div className="group">
            <label htmlFor="year" className="label">Year</label>
            <select
              id="year"
              className="input"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Select your year</option>
              <option value="1" disabled={isYearDisabled(1)} style={{ opacity: isYearDisabled(1) ? 0.5 : 1 }}>1st Year</option>
              <option value="2" disabled={isYearDisabled(2)} style={{ opacity: isYearDisabled(2) ? 0.5 : 1 }}>2nd Year</option>
              <option value="3" disabled={isYearDisabled(3)} style={{ opacity: isYearDisabled(3) ? 0.5 : 1 }}>3rd Year</option>
              <option value="4" disabled={isYearDisabled(4)} style={{ opacity: isYearDisabled(4) ? 0.5 : 1 }}>4th Year</option>
            </select>
            {formErrors.year && <span className="error-message">{formErrors.year}</span>}
          </div>
          
          <div className="group">
            <input type="submit" className="button" value="Register" onClick={handleSubmit} />
          </div>
          
          <div className="hr" />
        </div>
      </div>
    </div>
  );
};

export default Registration;
