import { createEvent } from '../services/eventService.js';

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
		const event = await User.findByIdAndDelete(eventId);
		res.status(200).json({ message: `success, remove user: ${event} ` });
	} catch (error) {
		res.status(500).json({ message: 'error', error });
	}
};

export { createEventController, deleteEventByIdController };
