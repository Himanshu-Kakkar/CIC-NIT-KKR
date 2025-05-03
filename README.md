# CIC: Campus Innovation Council
## A Club Management Website for NIT Kurukshetra

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

## Key Features
- Member Management & Authentication
- Event Management & Scheduling
- Real-time Attendance Tracking
- Admin Dashboard
- Event Calendar Integration
- Secure File Uploads
- Email Notifications

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

Visit `http://localhost:3000` to access the application.

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
