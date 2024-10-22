import { Router } from 'express';
import Events from '../../models/eventSchema.js';
import { createEventController } from '../../controller/eventController.js';
const router = Router();

router.get('/', async (req, res) => {
	const events = await Events.find();
	res.status(200).json(events);
});

router.post('/', createEventController);

export const eventRouter = router;
