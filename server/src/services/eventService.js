import Events from "../models/Events.js";

const createEvents = async (data, userId) => {
  return await Events.create({ ...data, createdBy: userId });
};


const getAllEvents = async () => {
 return await Events.find();
};

const getEventById = async (eventId) => {
  return await Events.findById(eventId);
};

const updateEvent = async (eventId, updatedData) => {
  return await Events.findByIdAndUpdate(eventId, updatedData, { new: true });
};

const deleteEvent = async (eventId) => {
  await Events.findByIdAndDelete(eventId);
}
export default { createEvents, getAllEvents,getEventById, updateEvent,deleteEvent };
