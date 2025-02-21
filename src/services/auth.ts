import axios from 'axios';
import { API_ENDPOINTS } from '/Users/chinmayingle/Documents/college-system/college-system-app/src/utils/constants';
// import { API_ENDPOINTS } from '../utils/constants';

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Login failed. Please check your credentials.');
    }
};

export const verifyUser = async (email: string) => {
    try {
        const response = await axios.get(`${API_ENDPOINTS.AUTH.VERIFY_USER}?email=${email}`);
        return response.data;
    } catch (error) {
        throw new Error('User verification failed.');
    }
};

export const logout = async () => {
    try {
        await axios.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
        throw new Error('Logout failed.');
    }
};