const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        USER_LOGIN: `${API_URL}/api/auth/userlogin`,
        ADMIN_LOGIN: `${API_URL}/api/auth/adminlogin`,
        FORGOT_PASSWORD: `${API_URL}/api/auth/forgotPassword`,
        RESET_PASSWORD: `${API_URL}/api/auth/resetPassword`,
    },
    // Event endpoints
    EVENT: {
        GET_ALL: `${API_URL}/api/event/all-events`,
        CREATE: `${API_URL}/api/event/create-event`,
        DELETE: (id) => `${API_URL}/api/event/delete-event/${id}`,
        REGISTER: (eventId) => `${API_URL}/api/event/${eventId}/register`,
        DOWNLOAD: (eventId) => `${API_URL}/api/event/${eventId}/download`,
    },
    // Member endpoints
    MEMBER: {
        GET_ALL: `${API_URL}/api/members`,
        CREATE: `${API_URL}/api/members`,
        DELETE: (id) => `${API_URL}/api/members/${id}`,
    },
    // Team endpoints
    TEAM: {
        GET_USER: `${API_URL}/getuser`,
        ADD_TEAM: `${API_URL}/addteams`,
        GET_TEAMS: `${API_URL}/getteams`,
    },
    // Calendar endpoints
    CALENDAR: {
        GET_ALL: `${API_URL}/calendarschema`,
        CREATE: `${API_URL}/calendarschema`,
    },
    // Notification endpoints
    NOTIFICATION: {
        NOTIFY_ALL: `${API_URL}/notify-all`,
    }
};

export default API_ENDPOINTS; 