// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import swal from "sweetalert";
// import "./Attendance.css";

// const AttendanceForm = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [studentsName, setStudentsName] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [day, setDay] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");

//   // 1. Fetch student names & initialize attendance
//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/getuser", {
//         headers: {
//           "content-type": "application/json",
//           token: token,
//         },
//       })
//       .then((response) => {
//         const names = response.data.data.map((user) => user.name);
//         setStudentsName(names);

//         const initialAttendance = names.reduce((obj, name) => {
//           obj[name] = "Absent";
//           return obj;
//         }, {});
//         setAttendance(initialAttendance);
//       })
//       .catch((error) => {
//         console.error("Failed to fetch users:", error);
//       });
//   }, []);

//   // 2. Mark Present or Absent
//   const handleButtonClick = (student, status) => {
//     setAttendance((prev) => ({ ...prev, [student]: status }));
//   };

//   // 3. Submit Attendance
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!day || !month || !year) {
//       return swal("Error", "Please enter a valid date", "error");
//     }

//     const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

//     const attendanceArray = Object.entries(attendance).map(([name, status]) => ({
//       name,
//       status,
//     }));

//     axios
//       .post(
//         "http://localhost:5001/submit-attendence",
//         {
//           attendanceData: attendanceArray,
//           date: formattedDate,
//         },
//         {
//           headers: {
//             "content-type": "application/json",
//             token: token,
//           },
//         }
//       )
//       .then((res) => {
//         if (res.data.message === "Attendance data saved successfully") {
//           swal("Success", "Attendance recorded", "success");
//         } else {
//           swal("Error", "Failed to save attendance", "error");
//         }
//       })
//       .catch((err) => {
//         console.error("Submit Error:", err);
//         swal("Error", "Something went wrong", "error");
//       });
//   };

//   return (
//     <div className="attendance-form-container">
//       <form onSubmit={handleSubmit}>
//         <h1 className="attendance-form-header">Attendance Form</h1>
//         <div className="attendance-form-Date">
//           <input
//             type="number"
//             min="1"
//             max="31"
//             placeholder="DD"
//             value={day}
//             onChange={(e) => setDay(e.target.value)}
//           />
//           <input
//             type="number"
//             min="1"
//             max="12"
//             placeholder="MM"
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//           />
//           <input
//             type="number"
//             min="2000"
//             max="2100"
//             placeholder="YYYY"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//           />
//         </div>

//         {studentsName.map((student, index) => (
//           <div className="attendance-form-student" key={index}>
//             <span>{student}</span>
//             <div className="attendance-form-button-container">
//               <button
//                 type="button"
//                 className={`attendance-form-button ${
//                   attendance[student] === "Present" ? "active" : ""
//                 }`}
//                 onClick={() => handleButtonClick(student, "Present")}
//               >
//                 Present
//               </button>
//               <button
//                 type="button"
//                 className={`attendance-form-button ${
//                   attendance[student] === "Absent" ? "active" : ""
//                 }`}
//                 onClick={() => handleButtonClick(student, "Absent")}
//               >
//                 Absent
//               </button>
//             </div>
//           </div>
//         ))}

//         <button type="submit" className="attendance-form-submits">
//           Submit Attendance
//         </button>

//         <button
//           type="button"
//           onClick={() => navigate("/get-attendance")}
//           className="attendance-form-submit"
//         >
//           View Attendance
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AttendanceForm;










import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import "./Attendance.css";

const AttendanceForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [studentsName, setStudentsName] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // 1. Fetch student names & initialize attendance
  useEffect(() => {
    axios
      .get("http://localhost:5001/getuser", {
        headers: {
          "content-type": "application/json",
          token: token,
        },
      })
      .then((response) => {
        const names = response.data.data.map((user) => user.name);
        setStudentsName(names);

        const initialAttendance = names.reduce((obj, name) => {
          obj[name] = "Absent";
          return obj;
        }, {});
        setAttendance(initialAttendance);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);

  // 2. Mark Present or Absent
  const handleButtonClick = (student, status) => {
    setAttendance((prev) => ({ ...prev, [student]: status }));
  };

  // 3. Submit Attendance
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!day || !month || !year) {
      return swal("Error", "Please enter a valid date", "error");
    }

    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const attendanceArray = Object.entries(attendance).map(([name, status]) => ({
      name,
      status,
    }));

    axios
      .post(
        "http://localhost:5001/submit-attendence",
        {
          attendanceData: attendanceArray,
          date: formattedDate,
        },
        {
          headers: {
            "content-type": "application/json",
            token: token,
          },
        }
      )
      .then((res) => {
        if (res.data.message === "Attendance data saved successfully") {
          swal("Success", "Attendance recorded", "success");
        } else {
          swal("Error", "Failed to save attendance", "error");
        }
      })
      .catch((err) => {
        console.error("Submit Error:", err);
        swal("Error", "Something went wrong", "error");
      });
  };

  // 4. Export to Excel/CSV
  const handleExportToExcel = () => {
    if (!day || !month || !year) {
      return swal("Error", "Please enter a valid date", "error");
    }

    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    
    // Prepare data for CSV export
    const headers = "Name,Status\n";
    const rows = Object.entries(attendance)
      .map(([name, status]) => `${name},${status}`)
      .join("\n");
    
    const csvContent = `Attendance for ${formattedDate}\n\n${headers}${rows}`;
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    // Set up and trigger download
    link.setAttribute("href", url);
    link.setAttribute("download", `Attendance_${formattedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    swal("Success", "Attendance exported to CSV file", "success");
  };

  return (
    <div className="attendance-form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="attendance-form-header">Attendance Form</h1>
        <div className="attendance-form-Date">
          <input
            type="number"
            min="1"
            max="31"
            placeholder="DD"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          <input
            type="number"
            min="1"
            max="12"
            placeholder="MM"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <input
            type="number"
            min="2000"
            max="2100"
            placeholder="YYYY"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
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
              </button>
            </div>
          </div>
        ))}

        <div className="attendance-form-buttons-row">
          {/* <button type="submit" className="attendance-form-submits">
            Submit Attendance
          </button>
           */}
          <button
            type="button"
            onClick={handleExportToExcel}
            className="attendance-form-submits"
          >
            Export to Excel
          </button>
          
          {/* <button
            type="button"
            onClick={() => navigate("/get-attendance")}
            className="attendance-form-submit"
          >
            View Attendance
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default AttendanceForm;






















































// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import swal from "sweetalert";
// import "./Attendance.css";

// const AttendanceForm = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [studentsName, setStudentsName] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [day, setDay] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");

//   // Fetch student list on load
//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/getuser", {
//         headers: {
//           "content-type": "application/json",
//           token,
//         },
//       })
//       .then((res) => {
//         const names = res.data.data.map((user) => user.name);
//         setStudentsName(names);

//         // Initialize all to Absent
//         const initial = {};
//         names.forEach((name) => (initial[name] = "Absent"));
//         setAttendance(initial);
//       })
//       .catch((err) => {
//         console.error(err);
//         swal("Error", "Failed to fetch users", "error");
//       });
//   }, []);

//   // Set present/absent
//   const handleButtonClick = (student, status) => {
//     setAttendance({ ...attendance, [student]: status });
//   };

//   // Submit attendance
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!day || !month || !year) {
//       return swal("Error", "Please enter a valid date", "error");
//     }

//     const formattedDate = new Date(`${year}-${month}-${day}`);
//     if (isNaN(formattedDate.getTime())) {
//       return swal("Error", "Invalid date", "error");
//     }

//     const attendanceArray = Object.entries(attendance).map(([name, status]) => ({
//       name,
//       status,
//     }));

//     try {
//       const res = await axios.post(
//         "http://localhost:5001/submit-attendence",
//         {
//           attendanceData: attendanceArray,
//           date: formattedDate,
//         },
//         {
//           headers: {
//             "content-type": "application/json",
//             token,
//           },
//         }
//       );

//       if (res.data.message === "Attendance data saved successfully") {
//         swal("Success", "Attendance recorded", "success");
//       } else {
//         swal("Error", res.data.message || "Something went wrong", "error");
//       }
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       swal("Error", "Server error while submitting attendance", "error");
//     }
//   };

//   return (
//     <div className="attendance-form-container">
//       <form onSubmit={handleSubmit}>
//         <h1 className="attendance-form-header">Attendance Form</h1>

//         <div className="attendance-form-Date">
//           <input
//             type="number"
//             placeholder="DD"
//             min="1"
//             max="31"
//             value={day}
//             onChange={(e) => setDay(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="MM"
//             min="1"
//             max="12"
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="YYYY"
//             min="2000"
//             max="2600"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//           />
//         </div>

//         {studentsName.map((student, idx) => (
//           <div className="attendance-form-student" key={idx}>
//             <span>{student}</span>
//             <div className="attendance-form-button-container">
//               <button
//                 type="button"
//                 className={`attendance-form-button ${
//                   attendance[student] === "Present" ? "active" : ""
//                 }`}
//                 onClick={() => handleButtonClick(student, "Present")}
//               >
//                 Present
//               </button>
//               <button
//                 type="button"
//                 className={`attendance-form-button ${
//                   attendance[student] === "Absent" ? "active" : ""
//                 }`}
//                 onClick={() => handleButtonClick(student, "Absent")}
//               >
//                 Absent
//               </button>
//             </div>
//           </div>
//         ))}

//         <button type="submit" className="attendance-form-submit">
//           Submit Attendance
//         </button>

//         <button
//           type="button"
//           onClick={() => navigate("/get-attendance")}
//           className="attendance-form-submit"
//         >
//           View Attendance
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AttendanceForm;
