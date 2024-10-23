import axios from 'axios';
import IEvent from 'interface/eventTypes';
import { useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
	CalendarDays,
	Map,
	ArrowRight,
	CircleDollarSign,
	UserCheck,
} from 'lucide-react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';

type event = {
	event: IEvent;
	index: number;
};

export default function CardContainer(event: event) {
	const BASE_URL = import.meta.env.VITE_BASE_URL;
	const descPreMaxLenght = 105;
	const [authorName, setAuthorName] = useState<string>('');
	const { user } = useUserStore();

	useEffect(() => {
		const getAuthorName = async () => {
			try {
				const response = await axios.get(
					`${BASE_URL}/users/${event.event.authorId}`,
				);
				setAuthorName(response.data.user.username);
			} catch (error) {
				setAuthorName('unknown author');
				console.error('Failed to fetch author name');
			}
		};
		getAuthorName();
	}, [event]);

	const deleteEvent = async () => {
		try {
			await axios.delete(`${BASE_URL}/events/delete/${event.event._id}`);
			window.location.reload();
		} catch (error) {
			console.error('error removeing event');
		}
	};

	return (
		<>
			<Card className="w-72 flex flex-col justify-between">
				<CardHeader>
					<CardTitle className="font-bold">
						<div className="flex flex-row justify-between">
							<div>
								<h2 className="text-xl">{event.event.title}</h2>
								<h1 className="font-thin text-sm tracking-wider">
									{authorName}
								</h1>
							</div>

							<div className="flex gap-1 text-sm">
								{event.event.ageLimit! > 0 && `${event.event.ageLimit}+`}
								{event.event.isPaymentRequired && <CircleDollarSign />}
								{event.event.needApproval && <UserCheck />}
							</div>
						</div>
					</CardTitle>
					<CardDescription className="break-all">
						{event.event.description?.substring(0, descPreMaxLenght)}
						{event.event.description!.length > descPreMaxLenght && '...'}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					<div className="flex gap-1">
						<CalendarDays />
						{event.event.startDate.toString().substring(0, 10)}
						{event.event.endDate && (
							<>
								<ArrowRight /> {event.event.endDate.toString().substring(0, 10)}
							</>
						)}
					</div>
					<div className="flex gap-1">
						<Map />
						{event.event.location}
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Link to={`/event/${event.event._id}`}>
						<Button variant="default">See more</Button>
					</Link>
					{event.event.authorId === user?._id && (
						<AlertDialog>
							<AlertDialogTrigger>
								<Trash2 />
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This will permanently delete your event with no way to
										recover it. Are you sure?
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter className="flex justify-between">
									<AlertDialogCancel>Nevermind</AlertDialogCancel>
									<AlertDialogAction onClick={() => deleteEvent()}>
										I am sure
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					)}
				</CardFooter>
			</Card>
		</>
	);
}
