import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import IEvent from "interface/eventTypes";
import EventListAccordionItem from "@/components/EventListAccordionItem";
import { useUserStore } from "@/store/useUserStore";
import Filter from "@/components/Filter";
import { useEventStore } from "@/store/useEventStore";

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
        `${BASE_URL}/events/author/${user!._id}`
      );
      setEvents(response.data);
    } catch (e) {
      console.error("Error getting user events:", e);
    }
  };

  const getAllEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/events`);

      setEvents(response.data);
    } catch (e) {
      console.error("Error getting all events: ", e);
    }
  };

  //get all events if not currently on the /events/own page
  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <>
      <Filter />
      <Accordion type="single" collapsible>
        {events.length > 0 ? (
          events.map((event, index) => (
            <EventListAccordionItem event={event} index={index} key={index} />
          ))
        ) : (
          <p className="flex items-center justify-center">
            No events to show...
          </p>
        )}
      </Accordion>
    </>
  );
}
