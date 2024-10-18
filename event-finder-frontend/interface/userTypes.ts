export interface IUser {
  email: string;
  password: string;
  username: string;
  age: number;
  ignoredEvents: string[];
  isOrganizer: boolean;
  createdEvents: string[];
  joinedEvents: string[];
  awaitingApprovalEvents: string[];
}
