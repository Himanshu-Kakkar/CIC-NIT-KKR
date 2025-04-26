import React from 'react'; 
import AssignTeamPage from './components/AssignPages/AssignPage'; 
import Project from './components/AssignPages/ProjectAssign.js'; 
// import AdminCards from './components/Home/AdminCrads.js'; 
import {Routes, Route, BrowserRouter} from "react-router-dom"; 
import Navbar from './components/navbar/NavBar.js'; 
import Notify from './components/Announcements/NotificationPage.js'; 
import Notes from './components/Courses/ReferenceNotes.js'; 
import Savednotes from './components/Courses/NotesSummary.js'; 
import Attendance from './components/Attendance/Attendance.js'; 
import AttendanceSummary from './components/Attendance/AttendanceSummary.js'; 
import Todo from './components/Todo/todo'; 
import Login from './components/Login/login' 
import AdminLogin from './components/Login/AdminLogin'; 
import Calendar from "./components/calender/Calendar"; 
import TeamCreate from './components/teams/TeamCreate'; 
import DeleteTeam from './components/teams/DeleteTeam'; 
import EditTeam from './components/teams/EditTeam';  
import Header from './components/Header/Header.js'

import './App.css'  

import Footer from './components/Footer/Footer.js'
 import PrivateRoute from './components/Auth/PrivateRoute.js';

import AdminDashboard from './components/Pages/AdminDashboard.js'
import EventsPage from './components/Pages/EventPage.js'
import ResetPassword from './components/Login/ResetPassword.js'; // adjust path as needed
import ErrorPage from './components/error/error.js'
import Developers from './components/developers/Developers';
import ClubForm from "./components/ClubForm/ClubForm.js";
import ClubDetailPage from "./components/Clubpage/ClubDetailPage.js";
import Clubpage from "./components/Clubpage/Clubpage.js";
import ContactUs from './components/ContactUs/ContactUs.js';
import PastEvents from "./components/PastEvents/PastEvents.js";
import ForgotPassword from './components/Login/forgot.js';
import Signup from './components/Login/signup.js';
import Registration from './components/Login/register.js';

export default function App() {   
  return(
    <BrowserRouter>
    
      <div className="App ">
        <Navbar/>
        <div className="Routes">
          <Routes>
          <Route path="/events" element={<EventsPage />} />

          <Route 
              path="/admin/dashboard" 
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } 
              
            />
            <Route path="/resetPassword/:id/:token" element={<ResetPassword />} />
   
          {/* <Route path="/admin-login" element={
         <PrivateRoute>
            <AdminLogin />
        </PrivateRoute>
        } */}
         {/* /> */}
        
       
            <Route path="/clubs" element={<Clubpage />} />
            <Route path="/clubs/:clubId" element={<ClubDetailPage />} />
            <Route path="/pastevents" element={<PastEvents />} />
            <Route path="/contact" exact element={<ContactUs />} />
             <Route path="/developers" element={<Developers />} />
            <Route path="/ClubForm" exact element={<ClubForm />}></Route> 
            <Route path="*" element={<ErrorPage />} />
            <Route path="/error" element={<ErrorPage />} />

            {/* <Route path="/" exact element={<Main />}></Route> */}
            <Route path="/" exact element={<Header/>}></Route>
            <Route path="/contact" exact element={<ContactUs/>}></Route>
            <Route path="/login" exact element={<Login />}></Route>
            <Route path="/Adminlogin" exact element={<AdminLogin />}></Route>
            <Route path="/forgot-password" exact element={<ForgotPassword />}></Route>
            <Route path="/signup" exact element={<Signup />}></Route>
            <Route path="/register" exact element={<Registration />}></Route>
           
            <Route path="/notify" exact element={<Notify />}></Route>
            <Route path="/projectassign" exact element={<Project />}></Route>
            <Route path="/teamassign" exact element={<AssignTeamPage />}></Route>
            <Route path="/notes" exact element={<Notes />}></Route>
            <Route path="/saved-data" exact element={<Savednotes />}></Route>
            <Route path="/attendance" exact element={<Attendance />}></Route>
            <Route path="/get-attendance" element={<AttendanceSummary />}></Route>
            <Route path="/todo" exact element={<Todo />}></Route>
            <Route path="/calender" exact element={<Calendar/>}></Route>
            <Route path="/admin-TeamCreate" exact element={<TeamCreate/>}></Route>
            <Route path="/Admin-Teamedit" exact element={<EditTeam/>}></Route>
            <Route path="/Admin-TeamDelete" exact element={<DeleteTeam/>}></Route>
          </Routes>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  ) 
}