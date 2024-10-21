import { Types } from 'mongoose';

export interface IUser {
   email: string;
   password: string;
   username: string;
   dob: Date;
   ignoredEvents?: {
      type: Types.ObjectId;
      ref: string;
   };
   isOrganizer?: boolean;
   createdEvents?: {
      type: Types.ObjectId;
      ref: string;
   };
   joinedEvents?: {
      type: Types.ObjectId;
      ref: string;
   };
   awaitingApprovalEvents?: {
      type: Types.ObjectId;
      ref: string;
   };
}
