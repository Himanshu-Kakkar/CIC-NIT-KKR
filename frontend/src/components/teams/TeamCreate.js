import React, { useState ,useEffect} from "react";
import "./Team.css";
import Swal from 'sweetalert2';
import axios from 'axios'
function TeamCreate() {
  const [teamNo, setTeamNo] = useState("");
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeamNo, setSelectedTeamNo] = useState("");
  const token=localStorage.getItem('token')

  useEffect(() => {
    axios.get("http://localhost:5001/getuser")
      .then(response => {
        setStudents(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (teamNo.trim() === "" || studentName.trim() === "") {
      alert('Please fill in all the fields.');
      return;
    }
    
    const member = { teamNo, studentName };
    const teamMemberTeamNos = teamMembers.map(member => member.teamNo);
    
    // check if all selected members belong to the same team number
    if (teamMemberTeamNos.every(tn => tn === teamNo)) {
      if (selectedTeamNo.trim() === "") {
        setSelectedTeamNo(teamNo);
      }
      setTeamMembers([...teamMembers, member]);
      setTeamNo("");
      setStudentName("");
    } else {
      alert('All selected members must belong to the same team number.');
    }
  };
  console.log(teamMembers)
  
  const handleCreateTeam = () => {
    if (teamMembers.length === 0) {
      alert('Please add team members before creating a team.');
      return;
    }
    const teamMembersForTeamNo = teamMembers.filter(member => member.teamNo === selectedTeamNo);
    const studentNames = Array.from(new Set(teamMembersForTeamNo.map(member => ({ name: member.studentName }))));

    
    const teamData = {
      teamNumber: selectedTeamNo,
      studentNames: studentNames
    };
    console.log(teamData)
 
    
    
    axios.post("http://localhost:5001/addteam", teamData, {
  headers:{
    'content-type':'application/json',
    'token': token
  }
})
.then(response => {
  Swal.fire({
    title: 'Team created',
    text: 'Team created successfully',
    icon: 'success',
    timer: 3001
  });
  setTeamNo("");
  setSelectedTeamNo("");
  setTeamMembers([]);
  console.log(response)
})
.catch(error => {
  console.error(error);
  Swal.fire({
    title: 'Error',
    text: 'There was an error creating the team',
    icon: 'error',
    timer: 3001
  });
});

  };

  const handleSelectChange = (event) => {
    setStudentName(event.target.value);
  };

  return (
    <div className="dropdown-menu">
      <h1>Create Your Team</h1>
      <form  className="dropdown-menu__form">
        <div>
          <label htmlFor="teamNo">Team No:</label>
          <input
            id="teamNo"
            type="text"
            value={teamNo}
            onChange={(event) => setTeamNo(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="studentName">Student Name:</label>
          <select id="studentName" value={studentName} onChange={handleSelectChange}>
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={student.name}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
      {teamMembers.length > 0 && (
        <div className="team-members">
          <h2>Team Members</h2>
          <table>
            <thead>
              <tr>
                <th>Team No</th>
                <th>Student Name</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <tr key={index}>
                  <td>{member.teamNo}</td>
                  <td>{member.studentName}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add" onClick={handleCreateTeam} type="submit">Create</button>
        </div>
        
      )}
    </div>
  );
}

export default TeamCreate;

