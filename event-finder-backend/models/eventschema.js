import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
    title: {String, required: true},
    description: {String},
    startDate: {Date, required: true},
    endDate: {Date, required: true},
    location: {String, required: true},
    maxAttendees: {Number},
    attendees: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users",
    },
    isPublic: {Boolean,default: true},
    secretInfo: {String},
    isPaymentRequired: {Boolean, default: false},
    isRegisterRequired: {Boolean, default: false},
    price: {Number},
    needApproval: {Boolean, default: false},
    userJoinRequests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users"
    },
    images: [String],
    ageLimit: {Number}, 
});