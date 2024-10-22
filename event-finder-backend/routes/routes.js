import { Router } from 'express';
import cors from 'cors';
import { userRouter } from './users/users.js';
import { eventRouter } from './events/events.js';
const router = Router();

router.use('/users', cors(), userRouter);
router.use('/events', cors(), eventRouter);
export default router;
