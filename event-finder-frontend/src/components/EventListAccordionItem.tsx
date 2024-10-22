import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import IEvent from 'interface/eventTypes';

type eventProp = {
	event: IEvent;
	index: number;
};

export default function EventListAccordionItem(event: eventProp) {
	return (
		<AccordionItem
			key={event.index}
			value={`item-${event.index}`}>
			<AccordionTrigger>{event.event.title}</AccordionTrigger>
			<AccordionContent>
				<div>
					<h1>{event.event.authorId}</h1>
					{event.event.description}
				</div>
			</AccordionContent>
		</AccordionItem>
	);
}
