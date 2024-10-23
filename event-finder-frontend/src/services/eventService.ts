import axios from 'axios';
import IEvent, { EventsFilter } from 'interface/eventTypes';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createEvent = async (newEvent: IEvent): Promise<IEvent> => {
   try {
      const response = await axios.post(`${BASE_URL}/events`, newEvent, {
         withCredentials: true,
      });
      console.log('Response from backend:', response);
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

export const getEventsByFilter = async (eventsFilter: EventsFilter): Promise<IEvent[]> => {
   console.log('Filter values:', eventsFilter);
   try {
      const response = await axios.get(`${BASE_URL}/events/filter`, {
         params: eventsFilter,
      });

      if (response.status !== 200) {
         console.error('Error getting events by filter', response);
         throw new Error();
      }
      const events: IEvent[] = response.data;
      return events;
   } catch (error) {
      console.error('Error getting events by filter', error);
      throw new Error();
   }
};
