import { Router } from 'express';
import Events from '../../models/eventSchema.js';
import {
	createEventController,
	deleteEventByIdController,
	getEventsByUserController,
} from '../../controller/eventController.js';
const router = Router();

router.get('/', async (req, res) => {
	const events = await Events.find();
	res.status(200).json(events);
});

router.get('/author/:id', getEventsByUserController);

router.post('/', createEventController);

router.delete('/delete/:id', deleteEventByIdController);

export const eventRouter = router;
