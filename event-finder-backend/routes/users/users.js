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

/* router.get('/', async (req, res) => {
   const users = await User.find();
   res.status(200).json(users);
}); */
router.post('/login', loginController);

//Get a list of all users
router.get('/all', getAllUsersController);

//get a user by id
router.get('/:id', getUserByIdController);

router.delete('/delete/:id', deleteUserByIdController);

export const userRouter = router;
