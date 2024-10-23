import { CalendarIcon, MapPinIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type eventView = {};

export const EventView: React.FC<eventView> = () => {
   return (
      <div className="flex flex-col min-h-screen">
         <section className="px-4 py-6 sm:px-6 sm:py-8">
            <div className="grid gap-4">
               <div>
                  <h1 className="text-2xl font-bold">Bonnies Gangbang</h1>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div className="text-2xl font-bold">$50</div>
                  </div>
                  <Button size="sm">Buy Tickets</Button>
               </div>
            </div>
         </section>
         <section className="px-4 py-6 sm:px-6 sm:py-8 border-t">
            <div className="grid gap-4">
               <div>
                  <h2 className="text-lg font-semibold">Event Details</h2>
                  <div className="grid gap-2 text-muted-foreground">
                     <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5" />
                        <div>June 15, 2023 - 10:00 AM to 6:00 PM</div>
                     </div>
                     <div className="flex items-center gap-2">
                        <MapPinIcon className="w-5 h-5" />
                        <div>123 Main St, Borås</div>
                     </div>
                     <div className="flex items-center gap-2">
                        <UserIcon className="w-5 h-5" />
                        <div>Organized by Bonnie</div>
                     </div>
                  </div>
               </div>
               <div>
                  <h2 className="text-lg font-semibold">About the Event</h2>
                  <p className="text-muted-foreground">Lets have fun!</p>
               </div>
            </div>
         </section>
      </div>
   );
};
