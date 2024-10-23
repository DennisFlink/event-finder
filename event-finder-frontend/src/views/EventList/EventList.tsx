import axios from 'axios';
import { useEffect } from 'react';
import CardContainer from '@/components/CardContainer';
import { useUserStore } from '@/store/useUserStore';
import Filter from '@/components/Filter';
import { useEventStore } from '@/store/useEventStore';

export default function EventList() {
	const BASE_URL = import.meta.env.VITE_BASE_URL;

	const { user } = useUserStore();
	const { events, setEvents } = useEventStore();
	// const [user, setUser] = useState<IUser | null>({
	// 	_id: '',
	// 	email: 'tempemail',
	// 	password: 'password',
	// 	username: 'username',
	// 	dob: new Date('2024-01-01T00:00:00'),
	// });

	const getUserEvents = async () => {
		try {
			const response = await axios.get(
				`${BASE_URL}/events/author/${user!._id}`,
			);
			setEvents(response.data);
		} catch (e) {
			console.error('Error getting user events:', e);
		}
	};

	const getAllEvents = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/events`);

			setEvents(response.data);
		} catch (e) {
			console.error('Error getting all events: ', e);
		}
	};

	//get all events if not currently on the /events/own page
	useEffect(() => {
		getAllEvents();
	}, []);

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
}
