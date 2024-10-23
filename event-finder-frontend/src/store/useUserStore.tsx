import { create } from 'zustand';
import { IUser } from '../../interface/userTypes';
import axios from 'axios';
interface State {
   user: IUser | null;
   fetchUserProfile: () => Promise<void>;

   setUser: (user: IUser | null) => void;
}
const initialState: State = {
   user: null,
   setUser: () => {},
   fetchUserProfile: async () => {},
};
export const useUserStore = create<State>((set) => ({
   ...initialState,
   setUser: (user) => set({ user }),
   fetchUserProfile: async () => {
      try {
         const response = await axios.get('http://localhost:3000/api/users/profile', {
            withCredentials: true,
         });
         set({ user: response.data.user });
      } catch (error) {
         console.error('Error fetching user profile:', error);
         set({ user: null });
      }
   },
}));
