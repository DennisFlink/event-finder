import axios from 'axios';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

export default function OwnEvents() {
	const getCreatedEvents = async () => {
		const userEvents = await axios.get(
			`http://localhost:3000/api/events/author/0v5t6mgnw83v03n65w8g7`,
		);
		console.log(userEvents.data);
	};
	getCreatedEvents();

	return (
		<Accordion
			type="single"
			collapsible>
			<AccordionItem value="item-1">
				<AccordionTrigger>Created event 1</AccordionTrigger>
				<AccordionContent>event info</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>Created event 2</AccordionTrigger>
				<AccordionContent>event info</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-3">
				<AccordionTrigger>Created event 3</AccordionTrigger>
				<AccordionContent>event info</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-4">
				<AccordionTrigger>Created event 4</AccordionTrigger>
				<AccordionContent>event info</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
