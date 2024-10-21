import { Router } from 'express';
import User from '../../models/userSchema.js';
import { createUserController, loginController } from '../../controller/userController.js';
const router = Router();

router.post('/signup', createUserController);

/* router.get('/', async (req, res) => {
   const users = await User.find();
   res.status(200).json(users);
}); */
router.post('/login', loginController);

export const userRouter = router;
