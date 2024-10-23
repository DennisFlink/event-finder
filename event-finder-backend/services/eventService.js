import Events from "../models/eventSchema.js";
import User from "../models/userSchema.js";
import RegExp from "mongoose";
const createEvent = async (eventData) => {
  console.log("Received Start Date (backend):", eventData.startDate);
  console.log("Received End Date (backend):", eventData.endDate);
  const event = new Events(eventData);
  return await event.save();
};


const getEventsByFilter = async (filterData) => {
  console.log("Filterdata",filterData);
  /* const user = await User.findOne({ userName: filterData.author });
  const userName = user.userName;
  console.log(userName); */
  console.log("Search date",filterData.date);
  const query = {
    ...(filterData.title && { title: { $regex: filterData.title, $options: "i" } }), 
    ...(filterData.location && { location: { $regex: filterData.location, $options: "i" } }),
    ...(filterData.ageLimit && { ageLimit: { $gte: Number(filterData.ageLimit) } }),
    ...(filterData.needsApproval !== undefined && { needApproval: filterData.needsApproval === "true" }),
  ...(filterData.date?.from && !filterData.date?.to && {
    startDate: {
      $gte: new Date(new Date(filterData.date.from).setHours(0, 0, 0, 0)),  
      $lte: new Date(new Date(filterData.date.from).setHours(23, 59, 59, 999))  
    }
  }),

  ...(filterData.date?.from && filterData.date?.to && {
    startDate: {
      $gte: new Date(new Date(filterData.date.from).setHours(0, 0, 0, 0)), 
      $lte: new Date(new Date(filterData.date.to).setHours(23, 59, 59, 999))  
    }
  }),
  isPaymentRequired: filterData.isPaymentRequired === "true",
  ...(filterData.totalAttendees && {totalAttendees: { $gte: filterData.totalAttendees }}),
  };

  const events = await Events.find(query);
  console.log("Events",events);
  return events;
};

export { createEvent,getEventsByFilter };
