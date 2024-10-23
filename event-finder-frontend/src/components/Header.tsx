import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import CreateEventModal from './CreateEventModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IUser } from 'interface/userTypes';

type HeaderProps = {
   // TODO
   // import users,
};

export default function Header({}: HeaderProps) {
   const [user, setUser] = useState<IUser | null>(null);
   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const response = await axios.get('http://localhost:3000/api/users/profile', {
               withCredentials: true,
            });
            console.log(response.data);
            setUser(response.data.user);
         } catch (error) {
            console.error('User not logged in');
            setUser(null);
         }
      };

      fetchUser();
   }, []);
   const handleLogout = () => {
      console.log('logging out...');
   };
   const handleGoBack = () => {
      navigate(-1);
   };

   return (
      <>
         <header className="p-5 shadow-lg flex justify-between items-center">
            {/* visa endast om current page inte är home */}
            <Button variant={'ghost'} onClick={() => handleGoBack()}>
               <ArrowLeft />
            </Button>

            <div className="flex gap-3 items-center justify-end">
               <p className="font-bold">{user ? `Welcome, ${user.username}` : 'Welcome, Guest'}</p>
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
                     <DropdownMenuItem>
                        <Link to="/events/own">See your events</Link>
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={() => handleLogout()}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </header>
      </>
   );
}
