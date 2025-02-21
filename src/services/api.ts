import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';

interface VoteData {
    candidateId: string;
    voterId: string;
}

interface ComplaintData {
    description: string;
    anonymous: boolean;
}

interface ApplicationData {
    applicantName: string;
    applicantEmail: string;
    applicationDetails: string;
}

// Axios instance with global settings (optional)
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000', // Adjust accordingly
    timeout: 5000, // Optional timeout
    headers: { 'Content-Type': 'application/json' }
});

// Generic function for logging errors
const handleApiError = (error: any, message: string) => {
    console.error(message, error.response?.data || error.message);
    throw new Error(`${message}: ${error.response?.data?.message || error.message}`);
};

// Fetch election data
export const fetchElectionData = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.ELECTIONS.BASE);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error fetching election data');
    }
};

// Submit a vote
export const submitVote = async (voteData: VoteData) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ELECTIONS.VOTE, voteData);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error submitting vote');
    }
};

// Fetch anonymous complaints
export const fetchComplaints = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.COMPLAINTS.ANONYMOUS);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error fetching complaints');
    }
};

// Submit a complaint
export const submitComplaint = async (complaintData: ComplaintData) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.COMPLAINTS.ANONYMOUS, complaintData);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error submitting complaint');
    }
};

// Fetch college budget data
export const fetchBudgetData = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.BUDGETS.BASE);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error fetching budget data');
    }
};

// Fetch academic integrity records
export const fetchAcademicIntegrityRecords = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.ACADEMIC.INTEGRITY);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error fetching academic integrity records');
    }
};

// Fetch applications
export const fetchApplications = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.APPLICATIONS.BASE);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error fetching applications');
    }
};

// Submit an application
export const submitApplication = async (applicationData: ApplicationData) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.APPLICATIONS.BASE, applicationData);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error submitting application');
    }
};

// Update application status
export const updateApplicationStatus = async (id: string, status: string) => {
    try {
        const response = await axiosInstance.patch(`${API_ENDPOINTS.APPLICATIONS.STATUS_UPDATE}/${id}`, { status });
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error updating application status');
    }
};

// Fetch budget tracking data
export const fetchBudgets = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.BUDGETS.TRACKING);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error fetching budgets');
    }
};

// Submit expense proof
export const submitExpenseProof = async (budgetId: string, proof: File) => {
    const formData = new FormData();
    formData.append('proof', proof);

    try {
        const response = await axiosInstance.post(`${API_ENDPOINTS.BUDGETS.UPLOAD_PROOF}/${budgetId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        handleApiError(error, 'Error submitting expense proof');
    }
};
