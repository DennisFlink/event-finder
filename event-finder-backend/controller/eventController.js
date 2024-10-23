import { createEvent, getEventsByFilter } from '../services/eventService.js';
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


export const getEventByFilterController = async (req, res) => {
	const eventsFilter = req.query;
	try {
		const events = await getEventsByFilter(eventsFilter);
		res.status(200).json(events);
	} catch (error) {
		res.status(500).json({ message: 'error getting event by filter', error });
	}
}

const getEventsByUserController = async (req, res) => {
    const userId = req.params.id;
    try {
        const events = await Events.find({ authorId: userId });
        res.status(200).json({ message: 'success', events });
    } catch (error) {
        res.status(500).json({
            message: `error getting event by user: ${userId}, error: ${error}`,
        });
    }
};


export { createEventController, deleteEventByIdController,getEventsByUserController  };
