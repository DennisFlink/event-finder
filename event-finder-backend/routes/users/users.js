import { Router } from 'express';
import User from '../../models/userSchema.js';
import {
	createUserController,
	loginController,
	getAllUsersController,
	getUserByIdController,
	deleteUserByIdController,
} from '../../controller/userController.js';
const router = Router();

router.post('/signup', createUserController);

router.post('/login', loginController);

router.get('/all', getAllUsersController);

router.get('/:id', getUserByIdController);

router.delete('/delete/:id', deleteUserByIdController);

export const userRouter = router;
