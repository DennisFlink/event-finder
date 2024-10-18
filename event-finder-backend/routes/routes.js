import { Router } from 'express';

import { userRouter } from './users/users.js';
import { eventRouter } from './events/events.js';
import { eventByAuthorRouter } from './events/eventsByAuthor.js';
const router = Router();

router.use('/users', userRouter);
router.use('/events', eventRouter);
router.use('/events/author', eventByAuthorRouter);
export default router;
