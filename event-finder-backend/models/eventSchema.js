import { Schema, model } from 'mongoose';
// import IEvent from '../interface/eventTypes';

const eventSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	location: { type: String, required: true },
	maxAttendees: { type: Number },
	attendees: {
		type: [Schema.Types.ObjectId],
		ref: 'users',
	},
	isPrivate: { type: Boolean, default: false },
	secretInfo: { type: String },
	isPaymentRequired: { type: Boolean, default: false },
	isRegisterRequired: { type: Boolean, default: false },
	price: { type: Number },
	needApproval: { type: Boolean, default: false },
	userJoinRequests: {
		type: [Schema.Types.ObjectId],
		ref: 'users',
	},
	images: [String],
	ageLimit: { type: Number },
	authorId: { type: String, required: true },
});

const Events = model('events', eventSchema);
export default Events;
