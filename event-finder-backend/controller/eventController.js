import { createEvent } from '../services/eventService.js';

const createEventController = async (req, res) => {
  try {
    const event = await createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event', message: error.message });
  }
};

export { createEventController };