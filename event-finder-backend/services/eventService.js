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
    ...(filterData.date?.from && filterData.date?.to && {
      $or: [
        {
          // Event med startDate som är inom intervallet
          startDate: {
            $gte: new Date(filterData.date.from),
            $lte: new Date(new Date(filterData.date.to).setHours(23, 59, 59, 999))
          }
        },
        {
          // Event med endDate som är inom intervallet
          endDate: {
            $gte: new Date(filterData.date.from),
            $lte: new Date(new Date(filterData.date.to).setHours(23, 59, 59, 999))
          }
        },
        {
          // Event som startar före `from` och slutar efter `to` (dvs. event som täcker hela intervallet)
          $and: [
            { startDate: { $lte: new Date(filterData.date.from) } },
            { endDate: { $gte: new Date(new Date(filterData.date.to).setHours(23, 59, 59, 999)) } }
          ]
        }
      ]
    })
  };
  /* const query = {
    ...(filterData.title && { title: filterData.title }),
    ...(filterData.date?.from && filterData.date?.to && {
      startDate: { $gte: new Date(filterData.date.from) }, 
      endDate: { $lte: new Date(filterData.date.to) },
    }),
    ...(userName && { author: userName }),
    ...(filterData.location && { location: filterData.location }),
    ...(filterData.ageLimit && { ageLimit: Number(filterData.ageLimit) }),
    ...(filterData.needsApproval !== undefined && { needApproval: filterData.needsApproval === "true" }),
  }; */

  const events = await Events.find(query);
  console.log("Events",events);
  return events;
};

export { createEvent,getEventsByFilter };
