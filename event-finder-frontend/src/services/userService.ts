import axios, { AxiosError } from 'axios';
import { IUser } from '../../interface/userTypes';

export const createUser = async (user: IUser) => {
   try {
      const res = await axios.post('http://localhost:3000/api/users', user);
      return res.data;
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