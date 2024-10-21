import mongoose from 'mongoose';
const { Schema, model } = mongoose;
// import { IUser } from "../interface/userTypes";

const userSchema = new Schema({
   email: { type: String, required: true },
   password: { type: String, required: true },
   username: { type: String, required: true },
   dob: { type: Date, required: true },
   ignoredEvents: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'events',
   },
   isOrganizer: { type: Boolean, default: false },
   createdEvents: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'events',
   },
   joinedEvents: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'events',
   },
   awaitingApprovalEvents: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'events',
   },
});

const User = model('user', userSchema);
export default User;
