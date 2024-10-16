import User from '../models/userSchema.js';

export const createUsers = async () => {
	console.log('Creating users');
	const newUser = new User({
		email: 'test@mail.com',
		password: 'password',
		username: 'test',
		age: 20,
		ignoredEvents: [],
		isOrganizer: false,
		createdEvents: [],
		joinedEvents: [],
		awaitingApprovalEvents: [],
	});
	await newUser.save().then(() => {
		console.log('User created');
	});
};
