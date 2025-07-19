import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
// import "./Attendance.css";

const API_URL = process.env.REACT_APP_API_URL;

const AttendanceForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [studentsName, setStudentsName] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [viewMode, setViewMode] = useState(false);
  const [searchDay, setSearchDay] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  const [searchYear, setSearchYear] = useState("");

  // 1. Fetch student names & initialize attendance
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get(`${API_URL}/getuser`, {
        headers: {
          "content-type": "application/json",
          "x-auth-token": token, // Changed from token to x-auth-token
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
        swal("Error", "Failed to fetch student data", "error");
      });
  };

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
        `${API_URL}/submit-attendence`,
        {
          attendanceData: attendanceArray,
          date: formattedDate,
        },
        {
          headers: {
            "content-type": "application/json",
            "x-auth-token": token, // Changed from token to x-auth-token
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

  // 4. Search attendance for a specific date
  const handleSearchAttendance = () => {
    if (!searchDay || !searchMonth || !searchYear) {
      return swal("Error", "Please enter a valid date to search", "error");
    }

    const formattedDate = `${searchYear}-${String(searchMonth).padStart(2, "0")}-${String(searchDay).padStart(2, "0")}`;

    axios
      .post(
        `${API_URL}/getattendancebydate`,
        {
          date: formattedDate,
        },
        {
          headers: {
            "content-type": "application/json",
            "x-auth-token": token, // Changed from token to x-auth-token
          },
        }
      )
      .then((res) => {
        if (res.data.status === "ok") {
          // Convert response to attendance object format
          const fetchedAttendance = res.data.data.reduce((obj, item) => {
            obj[item.name] = item.status;
            return obj;
          }, {});
          
          setAttendance(fetchedAttendance);
          
          // Set the current date fields to match the search
          setDay(searchDay);
          setMonth(searchMonth);
          setYear(searchYear);
          
          swal("Success", "Attendance data retrieved", "success");
        } else {
          swal("Error", "Failed to retrieve attendance data", "error");
        }
      })
      .catch((err) => {
        console.error("Search Error:", err.response?.data || err.message);
        swal("Error", "Attendance data not found for this date", "error");
      });
  };

  // 5. Export to Excel/CSV
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

  // Toggle between record and view modes
  const toggleViewMode = () => {
    setViewMode(!viewMode);
    if (!viewMode) {
      // Switching to view mode, reset the search fields
      setSearchDay("");
      setSearchMonth("");
      setSearchYear("");
    } else {
      // Switching back to record mode
      fetchStudents(); // Reset the attendance
    }
  };

  return (
    <>
         <h1 className="text-3xl font-bold mb-6 text-center text-blue-100">Manage Attendance</h1>

    <div className="bg-gradient-to-br from-slate-800 to-gray-900 rounded-2xl shadow-xl p-8 mb-8 border border-blue-500/20 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 to-blue-500 rounded-t-2xl" />
      <div className="flex justify-center mb-10 bg-slate-800 p-2 rounded-xl shadow border border-slate-700 relative z-10">
        <button 
          type="button" 
          className={`flex-1 py-4 px-6 rounded-lg font-semibold text-base transition-all duration-200 text-slate-400 bg-transparent relative z-20 text-center ${!viewMode ? 'text-slate-50 bg-gradient-to-br from-blue-900 to-blue-500 shadow-lg' : 'hover:text-slate-200 hover:bg-slate-700'}`}
          onClick={() => viewMode && toggleViewMode()}
        >
          Record Attendance
        </button>
        <button 
          type="button" 
          className={`flex-1 py-4 px-6 rounded-lg font-semibold text-base transition-all duration-200 text-slate-400 bg-transparent relative z-20 text-center ${viewMode ? 'text-slate-50 bg-gradient-to-br from-blue-900 to-blue-500 shadow-lg' : 'hover:text-slate-200 hover:bg-slate-700'}`}
          onClick={() => !viewMode && toggleViewMode()}
        >
          View Attendance
        </button>
      </div>
      {!viewMode ? (
        // Record Attendance Mode
        <form onSubmit={handleSubmit}>
          <h2 className="mb-6 text-blue-100 text-xl font-bold border-b border-slate-700 pb-4 relative">Record Attendance</h2>
          <div className="flex gap-4 mb-10 justify-center flex-wrap">
            <input
              type="number"
              min="1"
              max="31"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-28 py-3 px-4 rounded-lg border-2 border-slate-700 bg-slate-800 text-slate-100 text-center text-base font-medium transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/30 placeholder:text-slate-500"
            />
            <input
              type="number"
              min="1"
              max="12"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-28 py-3 px-4 rounded-lg border-2 border-slate-700 bg-slate-800 text-slate-100 text-center text-base font-medium transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/30 placeholder:text-slate-500"
            />
            <input
              type="number"
              min="2000"
              max="2100"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-28 py-3 px-4 rounded-lg border-2 border-slate-700 bg-slate-800 text-slate-100 text-center text-base font-medium transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/30 placeholder:text-slate-500"
            />
          </div>

          {studentsName.map((student, index) => (
            <div className="flex justify-between items-center py-5 px-6 mb-4 bg-slate-800 rounded-xl transition-all duration-200 border border-slate-700 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-slate-600 hover:bg-slate-700" key={index}>
              <span className="text-lg font-medium text-slate-100">{student}</span>
              <div className="flex gap-3">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg font-semibold text-base transition-all duration-200 text-slate-100 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/30 ${attendance[student] === "Present" ? "bg-green-700" : ""}`}
                  onClick={() => handleButtonClick(student, "Present")}
                >
                  Present
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg font-semibold text-base transition-all duration-200 text-slate-100 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/30 ${attendance[student] === "Absent" ? "bg-red-700" : ""}`}
                  onClick={() => handleButtonClick(student, "Absent")}
                >
                  Absent
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-10">
            <button type="submit" className="px-8 py-3 rounded-lg font-semibold text-base transition-all duration-200 text-slate-100 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
              Submit Attendance
            </button>
            <button
              type="button"
              onClick={handleExportToExcel}
              className="px-8 py-3 rounded-lg font-semibold text-base transition-all duration-200 text-slate-100 bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            >
              Export to Excel
            </button>
          </div>
        </form>
      ) : (
        // View Attendance Mode
        <div>
          <h1 className="mb-6 text-blue-100 text-xl font-bold border-b border-slate-700 pb-4 relative">View Attendance</h1>
          <div className="flex gap-4 mb-10 justify-center flex-wrap">
            <input
              type="number"
              min="1"
              max="31"
              placeholder="DD"
              value={searchDay}
              onChange={(e) => setSearchDay(e.target.value)}
              className="w-28 py-3 px-4 rounded-lg border-2 border-slate-700 bg-slate-800 text-slate-100 text-center text-base font-medium transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/30 placeholder:text-slate-500"
            />
            <input
              type="number"
              min="1"
              max="12"
              placeholder="MM"
              value={searchMonth}
              onChange={(e) => setSearchMonth(e.target.value)}
              className="w-28 py-3 px-4 rounded-lg border-2 border-slate-700 bg-slate-800 text-slate-100 text-center text-base font-medium transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/30 placeholder:text-slate-500"
            />
            <input
              type="number"
              min="2000"
              max="2100"
              placeholder="YYYY"
              value={searchYear}
              onChange={(e) => setSearchYear(e.target.value)}
              className="w-28 py-3 px-4 rounded-lg border-2 border-slate-700 bg-slate-800 text-slate-100 text-center text-base font-medium transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/30 placeholder:text-slate-500"
            />
            <button 
              type="button" 
              className="px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 text-slate-100 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              onClick={handleSearchAttendance}
            >
              Search
            </button>
          </div>
          
          {/* Only show attendance list if we have actual data to display */}
          {Object.keys(attendance).length > 0 && day && month && year && (
            <div>
              <h2 className="mb-6 text-blue-100 text-xl font-bold border-b border-slate-700 pb-4 relative">
                Attendance for: {day}/{month}/{year}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-slate-800 rounded-lg shadow-lg border border-slate-700">
                  <thead className="bg-slate-700 text-slate-200">
                    <tr>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-slate-100">Name</th>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-slate-100">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-100">
                    {Object.entries(attendance).map(([name, status], index) => (
                      <tr key={index} className="hover:bg-slate-700/50">
                        <td className="py-3 px-6 text-left text-sm font-medium">{name}</td>
                        <td className="py-3 px-6 text-left text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.toLowerCase() === 'present' ? 'bg-green-500 text-green-100' : 'bg-red-500 text-red-100'}`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end items-center mt-10">
                <button
                  type="button"
                  onClick={handleExportToExcel}
                  className="px-8 py-3 rounded-lg font-semibold text-base transition-all duration-200 text-slate-100 bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                >
                  Export to Excel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default AttendanceForm;