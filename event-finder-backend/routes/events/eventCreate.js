import { Router } from 'express';
import Events from '../../models/eventSchema.js';
const router = Router();

router.post('/', async (req, res) => {
	res.status(200);
});

export const eventCreateRouter = router;
