import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import IEvent from 'interface/eventTypes';

type event = {
	event: IEvent;
	index: number;
};

export default function EventListAccordionItem(event: event) {
	const getAuhtorDataById = () => {};

	return (
		<AccordionItem value={`item-${event.index}`}>
			<AccordionTrigger>{event.event.title}</AccordionTrigger>
			<AccordionContent>
				<div>
					<h1>Organized by: {event.event.authorId}</h1>
					{/* replace authorId with author name, make function to get authorData by author name? */}
					<p>{event.event.description}</p>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
}
