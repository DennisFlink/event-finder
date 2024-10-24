import axios from 'axios';
import { useEffect } from 'react';
import CardContainer from '@/components/CardContainer';
import { useUserStore } from '@/store/useUserStore';
import Filter from '@/components/Filter';
import { useEventStore } from '@/store/useEventStore';

type evenListProps = {
	loadUserEvents: boolean;
};
export const EventList: React.FC<evenListProps> = ({ loadUserEvents }) => {
	const BASE_URL = import.meta.env.VITE_BASE_URL;

	const { user } = useUserStore();
	const { events, setEvents } = useEventStore();

	const getEvents = async () => {
		try {
			if (loadUserEvents === true) {
				const response = await axios.get(
					`${BASE_URL}/events/author/${user!._id}`,
				);
				setEvents(response.data);
			} else {
				const response = await axios.get(`${BASE_URL}/events`);
				setEvents(response.data);
			}
		} catch (e) {
			console.error('Error getting events: ', e);
		}
	};

	useEffect(() => {
		getEvents();
		const interval = setInterval(() => {
			getEvents();
		}, 5000);

		return () => clearInterval(interval);
	}, [location.pathname]);

	return (
		<>
			<Filter />
			<div className="flex gap-4 p-4 flex-wrap">
				{events.length > 0 ? (
					events.map((event, index) => (
						<CardContainer
							event={event}
							index={index}
							key={index}
						/>
					))
				) : (
					<p className="flex items-center justify-center">
						No events to show...
					</p>
				)}
			</div>
		</>
	);
};
