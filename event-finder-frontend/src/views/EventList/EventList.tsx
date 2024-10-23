import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import IEvent from "interface/eventTypes";
import EventListAccordionItem from "@/components/EventListAccordionItem";
import Filter from "@/components/Filter";

export default function EventList() {
  const userId = ""; //temp
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [eventsList, setEventsList] = useState<IEvent[]>([]);

  const getUserEvents = async () => {
    try {
      console.log("getting user events");
      const response = await axios.get(
        `${BASE_URL}/events/author/${userId}` //replace with logged in user id.
      );
      setEventsList(response.data);
    } catch (e) {
      console.error("Error getting user events:", e);
    }
  };

  const getAllEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/events`);

      setEventsList(response.data);
    } catch (e) {
      console.error("Error getting all events: ", e);
    }
  };

  useEffect(() => {
    if (userId.length > 1000) {
      getUserEvents();
    } else {
      getAllEvents();
    }
  }, [userId]);

  return (
    <Accordion type="single">
      {eventsList.length > 0 ? (
        eventsList.map((event, index) => (
          <EventListAccordionItem event={event} index={index} />
        ))
      ) : (
        <p className="flex items-center justify-center">No events to show...</p>
      )}
    </Accordion>
  );
}
