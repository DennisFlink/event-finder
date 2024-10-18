import Events from '../models/eventSchema.js';  

const createEvent = async (eventData) => {
  const event = new Events(eventData);
  return await event.save();
};

export { createEvent };