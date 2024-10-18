import { Types } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  username: string;
  age: number;
  ignoredEvents: {
    type: Types.ObjectId;
    ref: string;
  };
  isOrganizer: boolean;
  createdEvents: {
    type: Types.ObjectId;
    ref: string;
  };
  joinedEvents: {
    type: Types.ObjectId;
    ref: string;
  };
  awaitingApprovalEvents: {
    type: Types.ObjectId;
    ref: string;
  };
}
