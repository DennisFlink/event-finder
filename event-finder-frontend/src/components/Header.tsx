import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import CreateEventModal from './CreateEventModal';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
	// TODO
	// import users,
};

export default function Header({}: HeaderProps) {
	const location = useLocation();
	const navigate = useNavigate();
	const handleLogout = () => {
		console.log('logging out...');
	};

	const handleCreateEvent = () => {
		console.log('creating event...');
	};

	const handleSeeEvents = () => {
		console.log('seeing events...');
		navigate('/createdEvents');
	};

	const handleGoBack = () => {
		console.log('going back...');
	};

	return (
		<>
			<header className="p-5 shadow-lg flex flex justify-between items-center">
				{/* visa endast om current page inte är home */}
				<Button
					variant={'ghost'}
					onClick={() => handleGoBack()}>
					<ArrowLeft />
				</Button>

				<div className="flex gap-3 items-center justify-end">
					<p className="font-bold">skoanton</p>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar>
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>My account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link to="/events/create">Create new event</Link>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleSeeEvents()}>
								Your events
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => handleLogout()}>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
		</>
	);
}
