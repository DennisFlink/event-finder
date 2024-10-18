import axios from 'axios';
import { useState } from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import IEvent from 'interface/eventTypes';

export default function EventList() {
	const userId = '';
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
						value={`item-${index}`}>
						<AccordionTrigger>
							<h1 className="mx-2">{event.title}</h1>
						</AccordionTrigger>
						<AccordionContent>
							<div className="bg-red-700"></div>
						</AccordionContent>
					</AccordionItem>
				))
			) : (
				<p className="flex items-center justify-center">
					You have not created any events...
				</p>
			)}
		</Accordion>
	);
}
