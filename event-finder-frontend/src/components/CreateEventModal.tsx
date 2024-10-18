import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CreateEventForm from "./CreateEventForm";
import { useNavigate } from "react-router";

type CreateEventModalProps = {};

export default function CreateEventModal({}: CreateEventModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleModalClose = () => {
    setIsOpen(false);
    navigate(-1);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleModalClose}>
        <DialogContent className="w-1/2">
          <DialogHeader>
            <DialogTitle>Create an event</DialogTitle>
            <DialogDescription>
              Fill in the form below to create a new event
            </DialogDescription>
          </DialogHeader>
          <CreateEventForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
