import { FilterIcon } from "lucide-react";

import FilterForm from "./FilterForm";
import { Button } from "./ui/button";
import { useState } from "react";

type FilterProps = {};

export default function Filter({}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="p-2 flex flex-col">
        <Button className="ml-auto" onClick={() => setIsOpen(!isOpen)}>
          <FilterIcon />
        </Button>

        {isOpen && (
          <div className="">
            <FilterForm />
          </div>
        )}
      </div>
    </>
  );
}
