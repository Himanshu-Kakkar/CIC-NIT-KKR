# KLUBB - Club Management System
## Club Website Development Project

### Submitted by:
[Your Name]
[Your Roll Number]
MCA 2nd Year

### Under the guidance of:
Dr. Lt. Nidhi Gupta
Department of Computer Applications
National Institute of Technology, Kurukshetra

## Project Overview
KLUBB is a comprehensive web-based club management system developed for the Institute Innovation Council (IIC) at NIT Kurukshetra. The system facilitates efficient management of club activities, members, events, and attendance through a user-friendly interface.

## Problem Statement
The existing club management system at IIC faced several challenges:
- Manual attendance tracking
- Inefficient event management
- Lack of centralized member database
- Difficulty in communication
- No real-time updates
- Limited reporting capabilities

## Objectives
1. **Primary Objectives**
   - Develop a centralized club management system
   - Implement automated attendance tracking
   - Create an efficient event management system
   - Establish secure member authentication

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


AST: 

├── Frontend (React)
│   ├── Components
│   │   ├── UI Components
│   │   ├── Pages
│   │   └── Features
│   ├── Hooks
│   └── Utils
│
└── Backend (Node.js)
    ├── Routes
    ├── Controllers
    ├── Models
    └── Middleware
```

### Technology Stack

#### Frontend
- **Framework**: React.js
- **State Management**: React Hooks
- **Routing**: React Router
- **UI Components**: Custom Components
- **API Integration**: Axios
- **Styling**: CSS3, Responsive Design

#### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JWT
- **File Storage**: Cloudinary
- **Email Service**: Nodemailer

## Key Features

### 1. Member Management
- Secure registration and login system
- Profile management with roll number validation
- Role-based access control
- Member status tracking

### 2. Event Management
- Event creation and scheduling
- Automated event registration
- Event calendar integration
- Event poster management
- Attendance tracking

### 3. Attendance System
- Automated attendance marking
- Real-time attendance tracking
- Attendance reports generation
- Member participation analytics

### 4. Admin Dashboard
- Comprehensive member management
- Event oversight
- Attendance monitoring
- System configuration
- Report generation

## Implementation Details

### Database Schema
```
User {
  name: String,
  email: String,
  rollNumber: String,
  password: String,
  role: String,
  status: String
}

Event {
  title: String,
  description: String,
  date: Date,
  venue: String,
  organizer: String,
  attendees: [User]
}


### API Endpoints
```
Authentication:
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile

Events:
GET    /api/events
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id

Attendance:
POST   /api/attendance/mark
GET    /api/attendance/report
```

# Acknowledgements

I would like to express my sincere gratitude to all those who have contributed to the successful completion of this project. Special thanks to my supervisor for their invaluable guidance and support throughout the research process. I am also grateful to my colleagues and friends for their encouragement and assistance.

# Abstract

## Conclusion
The KLUBB system successfully addresses the club management needs of IIC at NIT Kurukshetra. It provides a robust, secure, and user-friendly platform for managing club activities, members, and events. The system's modular architecture allows for future enhancements and scalability.

## References
1. React Documentation
2. Node.js Documentation
3. MongoDB Documentation
4. Express.js Documentation
5. JWT Authentication Guide
6. Cloudinary Documentation
7. AI tools
