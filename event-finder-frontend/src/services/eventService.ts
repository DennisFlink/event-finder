import axios from 'axios';
import IEvent from 'interface/eventTypes';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createEvent = async (newEvent: IEvent): Promise<IEvent> => {
	console.log('New event:', newEvent);

	try {
		const response = await axios.post(`${BASE_URL}/events`, newEvent);

		if (response.status !== 201) {
			console.error('Error creating event', response);
			throw new Error();
		}
		const eventCreated: IEvent = response.data;
		return eventCreated;
	} catch (error) {
		console.error('Error creating event', error);
		throw new Error();
	}
};
