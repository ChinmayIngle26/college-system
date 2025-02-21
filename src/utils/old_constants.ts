export const API_BASE_URL = 'http://your-api-base-url.com'; // Replace with your actual API base URL

export const API_ENDPOINTS = {
    ELECTION: `${API_BASE_URL}/elections`,
    COMPLAINTS: `${API_BASE_URL}/complaints`,
    ANONYMOUS_COMPLAINTS: `${API_BASE_URL}/anonymous-complaints`,
    BUDGETS: `${API_BASE_URL}/budgets`,
    BUDGET_TRACKING: '/budget-tracking',
    HEALTH_NOTIFICATIONS: `${API_BASE_URL}/health-notifications`,
    FACILITY_BOOKING: `${API_BASE_URL}/facility-booking`,
    APPLICATIONS: `${API_BASE_URL}/applications`,
    ACADEMIC_INTEGRITY: `${API_BASE_URL}/academic-integrity`,
    LOGIN: `${API_BASE_URL}/login`,
    VERIFY_USER: `${API_BASE_URL}/verify-user`,
    LOGOUT: `${API_BASE_URL}/logout`,

     // Add other endpoints as needed
    // ELECTION: '/api/election',
    // HEALTH_NOTIFICATIONS: '/api/health-notifications',
    // FACILITY_BOOKING: '/api/facility-booking',
    // APPLICATIONS: '/api/applications',
    // ACADEMIC_INTEGRITY: '/api/academic-integrity',
    // ANONYMOUS_COMPLAINTS: '/api/anonymous-complaints',
    // BUDGET_TRACKING: '/api/budget-tracking',
};

export const NOTIFICATION_TYPES = {
    HEALTH: 'HEALTH_NOTIFICATION',
    LEAVE: 'LEAVE_NOTIFICATION',
    APPLICATION_STATUS: 'APPLICATION_STATUS',
    COMPLAINT_RESPONSE: 'COMPLAINT_RESPONSE',
};

export const ROLE_TYPES = {
    STUDENT: 'STUDENT',
    FACULTY: 'FACULTY',
    ADMIN: 'ADMIN',
};