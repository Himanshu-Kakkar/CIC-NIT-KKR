import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useEffect } from 'react';
import swal from 'sweetalert'


import "./Attendance.css";


const AttendanceForm = () => {
  const navigate = useNavigate();
const token = localStorage.getItem('token');
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  
  const [studentsName, setStudentsName] = useState([
  ])
  useEffect(() => {
    axios.get('http://localhost:5001/getuser',{
      headers:{
        'content-type':'application/json',
        'token': token
      }
     })
      .then(response => {
        const names = response.data.data.map(user => user.name);
        setStudentsName(names);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const [attendance, setAttendance] = useState(
    studentsName.reduce((obj, student) => ({ ...obj, [student]: "Absent" }), {})

  );

  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const handleButtonClick = (student, status) => {
    setAttendance({ ...attendance, [student]: status });
  
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Check if the entered date is valid
    const newDate = new Date(`${year} ${month}, ${day}`);
    if (isNaN(newDate.getTime())) {
      window.alert("Please enter a valid date");
      return;
  
    } 
   
    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
     
     const arr = Object.entries(attendance).map(([name, status]) => ({ name, status }));
     axios.post('http://localhost:5001/submit-attendence', {
       attendanceData: arr,
       date // Convert date to ISO string format
     },{
      headers:{
        'content-type':'application/json',
        'token': token
      }
     }).then((response) => {
      if (response.data.message === "Attendance data saved successfully") {
        swal("Success ", "Attendance is recorded", "success");
        
  
       

      }})
     
    
    console.log(attendance)

  
    // Proceed with submitting the form
    // navigate("/get-attendance", { state: { attendance, date: newDate.toLocaleString() } });
  };
  

  

  

  

  return (
    <div className="attendance-form-container">
      <form onSubmit={handleSubmit} >
        <h1 className="attendance-form-header">Attendance Form</h1>
        <div className="attendance-form-Date">
          <input type="number" min="1" max="31" placeholder="DD" value={day} onChange={(e) => setDay(e.target.value)} />
          <input type="text" placeholder="MM" value={month} onChange={(e) => setMonth(e.target.value)} />
          <input type="number" min="2000" max="2100" placeholder="YYYY" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        {studentsName.map((student, index) => (
          <div className="attendance-form-student" key={index}>
            <span>{student}</span>
            <div className="attendance-form-button-container">
              <button
                type="button"
                className={`attendance-form-button ${
                  attendance[student] === "Present" ? "active" : ""
                }`}
                onClick={() => handleButtonClick(student, "Present")}
              >
                Present
              </button>
              <button
                type="button"
                className={`attendance-form-button ${
                  attendance[student] === "Absent" ? "active" : ""
                }`}
                onClick={() => handleButtonClick(student, "Absent")}
              >
                Absent
              </button></div>
      </div>
    ))}
    
    <button type="submit" className="attendance-form-submit">
      Submit
    </button>
    <button type="submit"  onClick={() => navigate("/get-attendance")} className="attendance-form-submit">
      view Attendance
    </button>
   
  </form>
</div>
);
};

export default AttendanceForm;
                
                
                