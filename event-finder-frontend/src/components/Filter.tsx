import { FilterIcon, Ghost } from "lucide-react";

import FilterForm from "./FilterForm";
import { Button } from "./ui/button";
import { useState } from "react";
import { useEventStore } from "@/store/useEventStore";
import { getAllEvents } from "@/services/eventService";

type FilterProps = {};

export default function Filter({}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { setEvents } = useEventStore();
  const onClose = () => {
    setIsOpen(false);
  };

  const handleReset = async () => {
    const events = await getAllEvents();
    setEvents(events);
  };

  return (
    <>
      <div className="p-4 flex flex-col">
        <div className="ml-auto flex gap-5 items-center">
          <Button onClick={handleReset} variant={"ghost"}>
            Reset Filter
          </Button>
          <Button onClick={() => setIsOpen(!isOpen)}>
            <FilterIcon />
          </Button>
        </div>

        {isOpen && (
          <div className="">
            <FilterForm onClose={onClose} />
          </div>
        )}
      </div>
    </>
  );
}
