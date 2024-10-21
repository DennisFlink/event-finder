import { createUser } from '../services/userService.js';
import User from '../models/userSchema.js';
import bcrypt from 'bcrypt';
const createUserController = async (req, res) => {
   try {
      const newUser = req.body;
      const newUserData = await createUser(newUser);
      res.status(201).json(newUserData);
   } catch (error) {
      if (error.message === 'User already exists') {
         return res.status(400).json([{ message: 'User already exists', error }]);
      }

      return res.status(500).json([{ message: 'ERROR', error }]);
   }
};

const loginController = async (req, res) => {
   try {
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: 'Invalid password' });
      }
   } catch (error) {
      res.status(500).json([{ MESSAGE: 'ERROR', error }]);
   }
};

export { createUserController, loginController };
