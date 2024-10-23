import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import CreateEventModal from './CreateEventModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { useUserStore } from '../store/useUserStore';
import { handleLogoutUser } from '@/services/userService';

type HeaderProps = {
   // TODO
   // import users,
};

export default function Header({}: HeaderProps) {
   const { user, fetchUserProfile, setUser } = useUserStore();

   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      fetchUserProfile();
   }, [fetchUserProfile]);

   const handleLogout = async () => {
      console.log('Logging out...');
      try {
         await handleLogoutUser();
         setUser(null);
         navigate('/');
      } catch (error) {
         console.error('Logout failed:', error);
      }
   };

   const handleGoBack = () => {
      navigate('/');
   };

   return (
      <>
         <header className="p-5 shadow-lg flex justify-between items-center">
            {/* visa endast om current page inte är home */}
            <Button variant={'ghost'} onClick={() => handleGoBack()}>
               <ArrowLeft />
            </Button>

            <div className="flex gap-3 items-center justify-end">
               <p className="font-bold">{user ? `Welcome, ${user.username}` : ''}</p>
               {user ? (
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
               ) : (
                  <div className=" flex gap-4">
                     <Link to="/login" className="text-primary">
                        <Button className=" rounded-md">{'Login'}</Button>
                     </Link>
                     <Link to="/signup" className="text-primary">
                        <Button variant="secondary" className="hover:bg-muted/50 rounded-md">
                           {'Sign Up'}
                        </Button>
                     </Link>
                  </div>
               )}
            </div>
         </header>
      </>
   );
}
