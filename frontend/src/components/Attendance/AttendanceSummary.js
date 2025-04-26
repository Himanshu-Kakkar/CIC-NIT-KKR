import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AttendanceSummary.css";
import axios from "axios";

const AttendanceSummary = () => {

  const token = localStorage.getItem('token')
  const [selectedDate, setSelectedDate] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const presentCount = attendanceData.reduce((count, student) => {
    return student.status === "Present" ? count + 1 : count;
  }, 0);
  
  const absentCount = attendanceData.reduce((count, student) => {
    return student.status === "Absent" ? count + 1 : count;
  }, 0);
  


  const [searchTerm, setSearchTerm] = useState("");
  const date = new Date(selectedDate); // Month is zero-based (0 = January)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;




  const downloadAttendance = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Student Name,Attendance\n" +
      Object.keys(attendanceData)
      .map((student) => `${attendanceData[student].name},${attendanceData[student].status}`)
      .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Attendance_${formattedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5002/getattendancebydate', { date: formattedDate }, {
        headers: {
          'content-type': 'application/json',
          'token': token
        }
      });
      setAttendanceData(response.data.data);
      console.log(attendanceData)
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="attendance-summary-container">
      <h1 className="attendance-summary-header">Attendance Summary</h1>
      {selectedDate !== null && (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className="attendance-summary-datepicker"
        />
      )}
      {selectedDate === null && (
        <input
          type="text"
          placeholder="Search by student name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="attendance-summary-search"
        />
      )}
      <ul className="attendance-summary-list">
        {attendanceData.map((student, index) => (
          <li key={index}>
            {student.name}: {student.status}
          </li>
        ))}

      </ul>
      <div className="attendance-summary-totals">
        <h3>
          <div className="attendance-summary-present">
            Total Present:{presentCount}
          </div>
        </h3>
        <h3>
          <div className="attendance-summary-absent">
            Total Absent:{absentCount}
          </div>
        </h3>
      </div>
      <button className="attendance-form-button" onClick={downloadAttendance}>Download Attendance</button>
      <button className="attendance-form-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AttendanceSummary;


















