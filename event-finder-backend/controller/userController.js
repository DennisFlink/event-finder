import { createUser, authenticateUser } from '../services/userService.js';

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
   const { email, password } = req.body;
   try {
      const user = await authenticateUser(email, password);
      res.status(200).json({ message: 'Login successful', user });
   } catch (error) {
      if (error.message === 'User not found' || error.message === 'Invalid password') {
         return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'ERROR', error });
   }
};

export { createUserController, loginController };
