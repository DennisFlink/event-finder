import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import axios from 'axios';
import IEvent from 'interface/eventTypes';
import { useEffect, useState } from 'react';

type event = {
	event: IEvent;
	index: number;
};

export default function EventListAccordionItem(event: event) {
	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const [authorName, setAuthorName] = useState<string>('');

	useEffect(() => {
		const getAuthorName = async () => {
			try {
				const response = await axios.get(
					`${BASE_URL}/users/${event.event.authorId}`,
				);
				setAuthorName(response.data.user.username);
			} catch (error) {
				console.error('Failed to fetch author name');
			}
		};
		getAuthorName();
	}, [event.event.authorId]);

	const deleteEvent = () => {
		try {
			axios.delete(`${BASE_URL}/events/delete/${event.event._id}`);
		} catch (error) {
			console.error('error removeing event');
		}
	};

	return (
		<div className="bg-white">
			<AccordionItem
				value={`item-${event.index}`}
				className="pl-2">
				<AccordionTrigger>
					<div className="flex  w-full text-left flex-col">
						{event.event.title}{' '}
						<div className="text-xs font-extralight">
							{event.event.startDate.toString().substring(0, 10)}
							{event.event.endDate &&
								`➡ ${event.event.endDate.toString().substring(0, 10)}`}
						</div>
						<h2 className="underline text-xs">{authorName}</h2>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<div className="flex flex-col">
						<div className=" flex flex-row w-full justify-between pr-6">
							<p className="max-w-full">{event.event.description}</p>
							<button onClick={() => deleteEvent()}>
								<img
									src="/SVGs/trashcan.svg"
									alt="del"
									className="text-[.6rem]  min-w-6 min-h-6 bg-white"
								/>
							</button>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</div>
	);
}
