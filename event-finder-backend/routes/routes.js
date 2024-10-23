import { Router } from 'express';
import cors from 'cors';
import { userRouter } from './users/users.js';
import { eventRouter } from './events/events.js';
import authenticate from '../auth/middleware.js';
import { getUserByIdController } from '../controller/userController.js';
const router = Router();

router.use('/users', userRouter);
router.use('/events', cors(), eventRouter);
router.use('/profile', authenticate());
export default router;
