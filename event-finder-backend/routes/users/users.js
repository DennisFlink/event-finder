import { Router } from 'express';
import User from '../../models/userSchema.js';
import { createUserController } from '../../controller/userController.js';
const router = Router();

router.post('/', createUserController);

router.get('/', async (req, res) => {
   const users = await User.find();
   res.status(200).json(users);
});

export const userRouter = router;
