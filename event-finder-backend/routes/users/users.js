import { Router } from 'express';
import User from '../../models/userSchema.js';
const router = Router();

router.post('/', async (req, res) => {
   const { email, password, username, age } = req.body;
   const newUser = new User({
      email,
      password,
      username,
      age,
   });

   await newUser.save();
   res.status(200).json([{ MESSAGE: 'CREATED NEW USER', newUser }]);
});

router.get('/', async (req, res) => {
   const users = await User.find();
   res.status(200).json(users);
});

export const userRouter = router;
