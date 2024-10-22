import { createEvent } from '../services/eventService.js';
import Events from '../models/eventSchema.js';

const createEventController = async (req, res) => {
	try {
		const event = await createEvent(req.body);
		res.status(201).json(event);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to create event', message: error.message });
	}
};

const deleteEventByIdController = async (req, res) => {
	const eventId = req.params.id;
	try {
		const event = await Events.findByIdAndDelete(eventId);
		res.status(200).json({ message: `success, remove event: ${event} ` });
	} catch (error) {
		res.status(500).json({ message: 'error deleting event', error });
	}
};

export { createEventController, deleteEventByIdController };
