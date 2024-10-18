import axios from 'axios';
import { IUser } from '../../interface/userTypes';

export const createUser = async (user: IUser) => {
   try {
      console.log(user);
      const res = await axios.post('http://localhost:3000/api/users', user);
      if (res.status === 400) {
         console.error('Email already in use');
         throw new Error('Email already in use');
      }
      if (res.status !== 201) {
         console.error('Error creating user', res.status);
         throw new Error('Error creating user');
      }
      return res.data;
   } catch (error: any) {
      if (error.response && error.response.status === 400) {
         return error.response.data[0].MESSAGE;
      } else {
         // For other errors, rethrow them to handle them elsewhere
         console.error(error);
         throw error;
      }
   }
};
