import IEvent from 'interface/eventTypes';
import './styles.css';
import { createEvent } from '@/services/eventService';

export default function AdminPanel() {
	const handleClick = async (action: string) => {
		console.log(action);
		const newEvent: IEvent = {
			title: 'TestEvent',
			description: 'TestDesc',
			startDate: new Date('2024-11-01T18:00:00.000+00:00'),
			endDate: new Date('2024-11-02T18:00:00.000+00:00'),
			location: 'Lidköping',
			maxAttendees: 0,
			isPrivate: false,
			secretInfo: 'secret info',
			isPaymentRequired: false,
			price: 0,
			isRegisterRequired: false,
			needApproval: false,
			images: [],
			ageLimit: 0,
			authorId: '1',
		};

		switch (action) {
			case 'newUser':
				break;
			case 'newEvent':
				const response = await createEvent(newEvent);
				break;
			default:
				throw new Error('unknown action');
		}
	};

	return (
		<>
			<h1 className="flex items-center justify-center font-bold text-2xl">
				Admin panel
			</h1>
			<div className="add-items-container">
				<button
					onClick={() => handleClick('newUser')}
					className="bg-green-100">
					Add User
				</button>
				<button
					onClick={() => handleClick('newEvent')}
					className="bg-green-100">
					Add Event
				</button>
				<button
					onClick={() => handleClick('clearUsers')}
					className="bg-red-100">
					Clear Users
				</button>
				<button
					onClick={() => handleClick('clearEvents')}
					className="bg-red-100">
					Clear Events
				</button>
			</div>
		</>
	);
}
