import axios from 'axios';
import { IUser } from '../../interface/userTypes';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createUser = async (user: IUser) => {
	try {
		const response = await axios.post(`${BASE_URL}/users/signup`, user);
		return response.data;
	} catch (error: unknown) {
		// Check if the error is an AxiosError
		if (axios.isAxiosError(error)) {
			if (error.response && error.response.status === 400) {
				// Return the specific error message from the backend (e.g., 'USER ALREADY EXISTS')
				return error.response.data[0].MESSAGE;
			}
		}
		// For non-Axios errors or other unexpected errors, rethrow them or handle them as needed
		console.error('An unexpected error occurred:', error);
		throw error;
	}
};

export const handleLoginUser = async (user: Partial<IUser>) => {
	try {
		const response = await axios.post(
			'http://localhost:3000/api/users/login',
			user,
			{
				withCredentials: true,
			},
		);
		console.log(response.data);
		return response.data;
	} catch (error: unknown) {
		// Check if the error is an AxiosError
		if (axios.isAxiosError(error)) {
			if (error.response) {
				// Check if the error response has a message property
				if (error.response.data && error.response.data.message) {
					throw new Error(error.response.data.message);
				}
				// Handle other possible structures
				throw new Error('An unexpected error occurred');
			}
		}
		// For non-Axios errors or other unexpected errors, rethrow them or handle them as needed
		console.error('An unexpected error occurred:', error);
		throw error;
	}
};
