import axios from 'axios';
import { useState } from 'react';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import IEvent from 'interface/eventTypes';

export default function EventList() {
	const userId = ''; //temp
	const [eventsList, setEventsList] = useState<IEvent[]>([]);

	const getCreatedEvents = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3000/api/events/author/0v5t6mgnw83v03n65w8g7`, //replace with logged in user id.
			);
			setEventsList(response.data);
		} catch (e) {
			console.error('Error getting user events:', e);
		}
	};

	const getAllEvents = async () => {
		try {
			const response = await axios.get(`http://localhost:3000/api/events`);
			setEventsList(response.data);
		} catch (e) {
			console.error('Error getting all events: ', e);
		}
	};

	if (userId!.length > 1) {
		getCreatedEvents();
	} else {
		getAllEvents();
	}

	return (
		<Accordion
			type="single"
			collapsible>
			{eventsList.length > 0 ? (
				eventsList.map((event, index) => (
					<AccordionItem
						key={index}
						value={`item-${index}`}></AccordionItem>
				))
			) : (
				<p className="flex items-center justify-center">
					You have not created any events...
				</p>
			)}
		</Accordion>
	);
}
