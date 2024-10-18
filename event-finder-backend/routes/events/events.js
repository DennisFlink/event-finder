import { Router } from 'express';
import Events from '../../models/eventSchema.js';
const router = Router();

router.get('/', async (req, res) => {
	const events = await Events.find();
	res.status(200).json(events);
});

export const eventRouter = router;
