import axios from 'axios';
import { API_ENDPOINTS } from '/Users/chinmayingle/Documents/college-system/college-system-app/src/utils/constants';

// import { API_ENDPOINTS } from '../utils/constants';

export const fetchElectionData = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.ELECTIONS.BASE);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching election data');
    }
};

interface VoteData {
    candidateId: string;
    voterId: string;
    // add other fields as necessary
}

export const submitVote = async (voteData: VoteData) => {
    try {
        const response = await axios.post(API_ENDPOINTS.ELECTIONS.VOTE, voteData);
        return response.data;
    } catch (error) {
        throw new Error('Error submitting vote');
    }
};

export const fetchComplaints = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.COMPLAINTS.ANONYMOUS);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching complaints');
    }
};

interface ComplaintData {
    title: string;
    description: string;
    // add other fields as necessary
}

export const submitComplaint = async (complaintData: ComplaintData) => {
    try {
        const response = await axios.post(API_ENDPOINTS.COMPLAINTS.ANONYMOUS, complaintData);
        return response.data;
    } catch (error) {
        throw new Error('Error submitting complaint');
    }
};

export const fetchBudgetData = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.BUDGETS.BASE);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching budget data');
    }
};

export const fetchAcademicIntegrityRecords = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.ACADEMIC.INTEGRITY);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching academic integrity records');
    }
};

export const fetchApplications = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.APPLICATIONS.BASE);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching applications');
    }
};

interface ApplicationData {
    title: string;
    description: string;
    // add other fields as necessary
}

export const submitApplication = async (applicationData: ApplicationData) => {
    try {
        const response = await axios.post(API_ENDPOINTS.APPLICATIONS.BASE, applicationData);
        return response.data;
    } catch (error) {
        throw new Error('Error submitting application');
    }
};

export const updateApplicationStatus = async (id: string, status: string) => {
    try {
        const response = await axios.patch(`${API_ENDPOINTS.APPLICATIONS.STATUS_UPDATE}/${id}`, { status });
        return response.data;
    } catch (error) {
        throw new Error('Error updating application status');
    }
};

export const fetchBudgets = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.BUDGETS.TRACKING);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching budgets');
    }
};

export const submitExpenseProof = async (budgetId: string, proof: File) => {
    const formData = new FormData();
    formData.append('proof', proof);

    try {
        const response = await axios.post(`${API_ENDPOINTS.BUDGETS.UPLOAD_PROOF}/${budgetId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error submitting expense proof');
    }
};