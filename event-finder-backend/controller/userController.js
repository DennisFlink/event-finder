import { createUser } from '../services/userService.js';
import User from '../models/userSchema.js';
const createUserController = async (req, res) => {
   try {
      const { email } = req.body;
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
         return res.status(400).json([{ MESSAGE: 'USER ALREADY EXISTS' }]);
      }
      const newUser = await createUser(req.body);
      res.status(201).json(newUser);
   } catch (error) {
      res.status(500).json([{ MESSAGE: 'ERROR', error }]);
   }
};

export { createUserController };
