# CIC: Campus Innovation Council
## A Club Management Website

### Team Members:
- Himanshu Kakkar (523110014)
- Nikhil Agrawal (523410009)
- Kushagra Richhariya (523410035)
- Ritik Maheshwari (523110025)

### Under the guidance of:
Dr. Nidhi Gupta
Department of Computer Applications
National Institute of Technology, Kurukshetra

## Project Overview
CIC (Campus Innovation Council) is a comprehensive web-based club management system developed for the Institute Innovation Council (IIC) at NIT Kurukshetra. The system facilitates efficient management of club activities, members, events, and attendance through a user-friendly interface.

### Home Page
The main landing page of CIC showcasing the club's activities and upcoming events.
<div align="center">
  <img src="https://res.cloudinary.com/dvnzvz4xh/image/upload/v1746282711/home_f5rrqs.png" alt="CIC home" width="500"/>
</div>

### Developers Section
Meet the talented team behind the development of CIC platform.
<div align="center">
  <img src="https://res.cloudinary.com/dvnzvz4xh/image/upload/v1746282710/develpoers_ti6tkh.png" alt="developers" width="500"/>
</div>

## Key Features
- Member Management & Authentication
- Event Management & Scheduling
- Real-time Attendance Tracking
- Admin Dashboard
- Event Calendar Integration
- Secure File Uploads
- Email Notifications

### Event Registration
Easy and intuitive event registration system for members.
<div align="center">
  <img src="https://res.cloudinary.com/dvnzvz4xh/image/upload/v1746282715/register_qai4fz.png" alt="Register for events" width="500"/>
</div>

### Attendance Management
Comprehensive attendance tracking system for events and meetings.
<div align="center">
  <img src="https://res.cloudinary.com/dvnzvz4xh/image/upload/v1746282709/attendence_cpqbvg.png" alt="Admin-Dashboard" width="500"/>
</div>

### Admin Dashboard
Centralized control panel for administrators to manage all aspects of the platform.
<div align="center">
  <img src="https://res.cloudinary.com/dvnzvz4xh/image/upload/v1746282709/admin-dash_wjbb2p.png" alt="Manage-Attendence" width="500"/>
</div>

### Member Management
Efficient system for managing member profiles and permissions.
<div align="center">
  <img src="https://res.cloudinary.com/dvnzvz4xh/image/upload/v1746282711/member-mngmnt_r4cs8v.png" alt="Manage-Members" width="500"/>
</div>

### Member Dashboard
Personalized dashboard for members to track their activities and registrations.
<div align="center">
  <img src="https://res.cloudinary.com/dvnzvz4xh/image/upload/v1746282711/member-dash_diztxi.png" alt="Members-dashboard" width="500"/>
</div>

## Tech Stack
### Frontend
- React.js
- React Router
- Axios
- FullCalendar
- React Hot Toast

### Backend
- Node.js with Express
- MongoDB
- JWT Authentication
- Socket.io
- Cloudinary
- Nodemailer

## Quick Start

1. Clone the repository
```bash
git clone https://github.com/Himanshu-Kakkar/KLUBB
cd cic-project
```

2. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Environment Setup
Create `.env` file in backend directory:
```
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

4. Run the Application
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm start
```

Visit `http://localhost:3001` to access the application.

## Project Structure
```
cic-project/
├── backend/
│   ├── config/        # Configuration files
│   ├── controllers/   # Request handlers
│   ├── middleware/    # Authentication middleware
│   ├── models/        # Database schemas
│   ├── routes/        # API routes
│   └── index.js       # Main server file
└── frontend/
    ├── public/        # Static files
    └── src/           # React components
```

## Declaration
We, the undersigned, hereby declare that this project entitled "CIC- Campus Innovation Council" is a genuine and original record of the work carried out by us as a part of the Master of Computer Applications (MCA) curriculum at the Department of Computer Applications, National Institute of Technology, Kurukshetra. We further confirm that this work has not been submitted, in part or in full, to any other institute or university for the award of any degree or diploma.
