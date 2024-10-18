import { Router } from 'express';

import { userRouter } from './users/users.js';
import { eventRouter } from './events/events.js';
const router = Router();

router.use('/users', userRouter);
router.use('/events', eventRouter);
export default router;
