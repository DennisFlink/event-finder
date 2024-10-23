import IEvent from "interface/eventTypes";
import { create } from "zustand";
interface State {
  events: IEvent[];
  setEvents: (events: IEvent[]) => void;
}

const initialState: State = {
  events: [],
  setEvents: () => {},
};

export const useEventStore = create<State>((set) => ({
  ...initialState,
  setEvents: (events) => set({ events }),
}));
