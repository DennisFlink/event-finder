import { DateRange } from "react-day-picker";

export default interface IEvent {
  _id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location: string;
  maxAttendees?: number;
  attendees?: string[];
  isPrivate?: boolean;
  secretInfo?: string;
  isPaymentRequired?: boolean;
  isRegisterRequired?: boolean;
  price?: number;
  needApproval?: boolean;
  userJoinRequests?: string[];
  images?: string[];
  ageLimit?: number;
  authorId: string;
}

export interface EventsFilter {
  title?: string;
  location?: string;
  priceRange?: number[];
  date?: { from?: string; to?: string };
  author?: string;
  ageLimit?: number;
  needsApproval?: boolean;
  totalAttendees?: number;
  isPaymentRequired?: boolean;
}
