import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // import faBell and faSignOutAlt icons
// import logo from './image/scb_logo.png';
import './NotificationPage.css';
import axios from 'axios'
import swal from 'sweetalert'
function App() {
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  function toggleNotification() {
    setNotificationVisible(!notificationVisible);
    setNotificationCount(0); // reset notification count on click
  }

  function hideNotification() {
    setNotificationVisible(false);
    setNotificationCount(0); // reset notification count on hide
  }

  function handleNotificationSubmit() {
    setNotificationCount(notificationCount + 1);
  }

  function handleLogout() {
    // Logic to handle the logout button click
    console.log('User logged out.');
  }

  return (
    <div className='notification-container'>
      <header>
        <nav>
          <ul>
            {/* <li style={{ float: 'left' }}>
              <img id="logo" src={logo} alt="scb-logo" />
            </li> */}
            <li>
              <a href="#" onClick={toggleNotification}>
                <div className="notification-icon">
                  <FontAwesomeIcon icon={faBell} />
                  {notificationCount > 0 && <div className="notification-count">{notificationCount}</div>}
                </div>
              </a>
            </li>
            <button className='logout-icon'>
            <li>
              <a href="/"><FontAwesomeIcon icon={faSignOutAlt} />
              </a>
            </li>
            </button>
          </ul>
        </nav>
      </header>
      <div className="content">
        {notificationVisible && notificationMessage && (
          <div className="notification-message" onClick={hideNotification}>
            {notificationMessage}
          </div>
        )}
        <NotificationForm setNotificationMessage={setNotificationMessage} handleNotificationSubmit={handleNotificationSubmit} />
      </div>
    </div>
  );
}

function NotificationForm({ setNotificationMessage, handleNotificationSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  
  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (!title || !content) {
      setError('Please fill in both the title and content fields.');
      return;
    }
    const data={
      title,content
    };
    // Logic to handle the submission of the notification form
    axios.post('http://localhost:5001/notify-all', data)
    .then((res) => {
      swal("Success ", "Notification sent ", "success");
  }
    )
}

  return (
    <>
      <h2>Notification Form</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className='label' htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label className='label' htmlFor="content">Content:</label>
          <input
            type="text"
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <button className='notification-button' onClick={handleSubmit}>Send Notification</button>
      </form>
    </>
  );
}

export default App;


