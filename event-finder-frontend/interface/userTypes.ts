export interface IUser {
	_id: string;
	email: string;
	password: string;
	username: string;
	dob: Date;
	ignoredEvents?: string[];
	isOrganizer?: boolean;
	createdEvents?: string[];
	joinedEvents?: string[];
	awaitingApprovalEvents?: string[];
}
