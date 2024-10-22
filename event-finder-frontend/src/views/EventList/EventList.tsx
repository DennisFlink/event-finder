import axios from 'axios';
import { useEffect, useState } from 'react';
import { Accordion } from '@/components/ui/accordion';
import IEvent from 'interface/eventTypes';
import EventListAccordionItem from '@/components/EventListAccordionItem';

export default function EventList() {
	const userId = ''; //temp
	const [eventsList, setEventsList] = useState<IEvent[]>([]);

	const getUserEvents = async () => {
		try {
			console.log('getting user events');
			const response = await axios.get(
				`http://localhost:3000/api/events/author/${userId}`, //replace with logged in user id.
			);
			setEventsList(response.data);
		} catch (e) {
			console.error('Error getting user events:', e);
		}
	};

	const getAllEvents = async () => {
		try {
			console.log('getting all events');
			const response = await axios.get(`http://localhost:3000/api/events`);
			setEventsList(response.data);
		} catch (e) {
			console.error('Error getting all events: ', e);
		}
	};

	useEffect(() => {
		if (userId.length > 1) {
			getUserEvents();
		} else {
			getAllEvents();
		}
	}, [userId]);

	return (
		<Accordion
			type="single"
			collapsible>
			{eventsList.length > 0 ? (
				eventsList.map((event, index) => (
					<EventListAccordionItem
						event={event}
						index={index}
					/>
				))
			) : (
				<p className="flex items-center justify-center">No events to show...</p>
			)}
		</Accordion>
	);
}
