export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// API Endpoints
export const API_ENDPOINTS = Object.freeze({
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        VERIFY_USER: `${API_BASE_URL}/auth/verify-user`,
        LOGOUT: `${API_BASE_URL}/auth/logout`,
        REGISTER: `${API_BASE_URL}/auth/register`,
    },
    ELECTIONS: {
        BASE: `${API_BASE_URL}/elections`,
        VOTE: `${API_BASE_URL}/elections/vote`,
        RESULTS: `${API_BASE_URL}/elections/results`,
    },
    COMPLAINTS: {
        ALL: `${API_BASE_URL}/complaints`,
        ANONYMOUS: `${API_BASE_URL}/anonymous-complaints`,
    },
    BUDGETS: {
        BASE: `${API_BASE_URL}/budgets`,
        TRACKING: `${API_BASE_URL}/budget-tracking`,
        UPLOAD_PROOF: `${API_BASE_URL}/budget-tracking/upload-proof`,
    },
    FACILITY: {
        BOOKING: `${API_BASE_URL}/facility-booking`,
        CHECK_AVAILABILITY: `${API_BASE_URL}/facility-booking/availability`,
    },
    NOTIFICATIONS: {
        HEALTH: `${API_BASE_URL}/health-notifications`,
        EMAIL: `${API_BASE_URL}/notifications/email`,
    },
    ACADEMIC: {
        INTEGRITY: `${API_BASE_URL}/academic-integrity`,
    },
    APPLICATIONS: {
        BASE: `${API_BASE_URL}/applications`,
        STATUS_UPDATE: `${API_BASE_URL}/applications/status`,
    },
    FILE_UPLOAD: {
        IMAGE_UPLOAD: `https://api.cloudinary.com/v1_1/your-cloud-name/image/upload`,
        FILE_UPLOAD: `https://api.cloudinary.com/v1_1/your-cloud-name/raw/upload`,
    },
    REALTIME: {
        SOCKET: `${API_BASE_URL}/realtime`,
    },
    PAYMENTS: {
        RAZORPAY: `${API_BASE_URL}/payments/razorpay`,
        STRIPE: `${API_BASE_URL}/payments/stripe`,
    },
});
