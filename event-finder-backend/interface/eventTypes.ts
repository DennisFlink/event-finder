import { Types } from "mongoose";
export default interface IEvent {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location: string;
  maxAttendees?: number;
  attendees: {
    type: Types.ObjectId;
    ref: string;
  };
  isPrivate?: boolean;
  secretInfo?: string;
  isPaymentRequired?: boolean;
  isRegisterRequired?: boolean;
  price?: number;
  needApproval?: boolean;
  userJoinRequests: {
    type: Types.ObjectId;
    ref: string;
  };
  images?: string[];
  ageLimit?: number;
  authorId: string;
}
