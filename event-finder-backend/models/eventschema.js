import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    maxAttendees: { type: Number },
    attendees: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users",
    },
    isPrivate: { type: Boolean, default: false },
    secretInfo: { type: String },
    isPaymentRequired: { type: Boolean, default: false },
    isRegisterRequired: { type: Boolean, default: false },
    price: { type: Number },
    needApproval: { type: Boolean, default: false },
    userJoinRequests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users"
    },
    images: [String],
    ageLimit: { type: Number },
});

const Events = mongoose.model("events", eventSchema);
export default Events;