export default interface IEvent {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
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
