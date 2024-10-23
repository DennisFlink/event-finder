import { Router } from 'express';
import User from '../../models/userSchema.js';
import authenticate from '../../auth/middleware.js';
import { createUserController, loginController, getAllUsersController, deleteUserByIdController, getUserProfile } from '../../controller/userController.js';
const router = Router();

router.post('/signup', createUserController);

router.post('/login', loginController);

router.get('/all', getAllUsersController);

router.get('/profile', authenticate, getUserProfile);

router.delete('/delete/:id', deleteUserByIdController);

export const userRouter = router;
