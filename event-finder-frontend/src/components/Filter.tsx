import { FilterIcon } from "lucide-react";
import FilterForm from "./FilterForm";
import { Button } from "./ui/button";
import { useState } from "react";

type FilterProps = {};

export default function Filter({}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div>
        <Button onClick={() => setIsOpen(!isOpen)}>
          <FilterIcon />
        </Button>
        {isOpen && <FilterForm />}
      </div>
    </>
  );
}
