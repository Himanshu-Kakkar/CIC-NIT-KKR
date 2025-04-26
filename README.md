# KLUBB - Club Management System

## Quick Start
```bash
# Install dependencies for backend
cd backend
npm install

# Install dependencies for frontend
cd ../frontend
npm install

# Start backend server
cd ../backend
npm start

# Start frontend development server
cd ../frontend
npm start
```

## Project Overview
KLUBB is a web-based club management system that helps manage club activities, members, events, and attendance. It provides features for both administrators and club members to efficiently handle club operations.

## Features

### Member Management
- Member registration and login
- Profile management
- Unique roll number and email validation
- Secure password handling

### Event Management
- Create and manage events
- Event registration system
- Event calendar integration
- Event poster uploads

### Attendance System
- Track member attendance
- Generate attendance reports
- Date-wise attendance records
- Member status tracking

### Admin Features
- Admin login and authentication
- Member management
- Event creation and management
- Attendance tracking
- Notification system

## Technical Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- FullCalendar for event scheduling
- React Hot Toast for notifications
- SweetAlert for alerts

### Backend
- Node.js with Express
- MongoDB for database
- Mongoose for database modeling
- JWT for authentication
- Socket.io for real-time features
- Cloudinary for image storage
- Nodemailer for email notifications

## Project Structure
```
KLUBB/
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

## Environment Setup
1. Create a `.env` file in the backend directory
2. Add the following variables:
   ```
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

## Security Features
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- Input validation
- Secure file uploads

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the ISC License. 