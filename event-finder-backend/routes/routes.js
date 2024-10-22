import { Router } from 'express';
import cors from 'cors';
import { userRouter } from './users/users.js';
import { eventRouter } from './events/events.js';
import { eventByAuthorRouter } from './events/eventsByAuthor.js';
const router = Router();

router.use('/users', userRouter);
router.use('/events', cors(), eventRouter);
router.use('/events/author', cors(), eventByAuthorRouter);
export default router;
