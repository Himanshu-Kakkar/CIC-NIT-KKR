import React from 'react';
// import Header from '../navbar/NavBar';
import './AdminCards.css';
import { Navigate, useNavigate } from 'react-router-dom';
import  {  useEffect } from 'react';
import swal from 'sweetalert'
const token = localStorage.getItem('token');
function Card(props) {
 
  return (
    <a href={props.link}>
      <div className="card">
        <div className={`front ${props.class}`}></div>
        <div className="back">
          {props.title}
        </div>
      </div>
    </a>
  );
}

function AdminCards() {
  
  return (
    <div>
      <div className="container">
        <Card class="front4" title="Schedule" link="/calender" />
        <Card class="front9" title="Todo" link="/todo" />
        <Card class="front6" title="Projects" link="/projectassign"/>
        <Card class="front3" title="Team Info" link="/admin-TeamCreate" />
        <Card class="front7" title="Announcements" link="/notify" />
        <Card class="front11" title="Id card" link="#" />
      </div>
    </div>
  );
}

export default AdminCards;