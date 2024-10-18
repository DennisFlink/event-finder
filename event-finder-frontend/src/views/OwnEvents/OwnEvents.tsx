import axios from 'axios';
import { useState } from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import IEvent from 'interface/eventTypes';

export default function OwnEvents() {
	const [userEvents, setUserEvents] = useState<IEvent[]>([]);

	const getCreatedEvents = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3000/api/events/author/0v5t6mgnw83v03n65w8g7`,
			);
			setUserEvents(response.data);
		} catch (e) {
			console.error('Error fetching events:', e);
		}
	};

	getCreatedEvents();

	return (
		<Accordion
			type="single"
			collapsible>
			{userEvents.length > 0 ? (
				userEvents.map((event, index) => (
					<AccordionItem
						key={index}
						value={`item-${index}`}>
						<AccordionTrigger>{event.title}</AccordionTrigger>
						<AccordionContent>
							<div className="bg-red-700"></div>
						</AccordionContent>
					</AccordionItem>
				))
			) : (
				<p>No events found.</p>
			)}
		</Accordion>
	);
}
