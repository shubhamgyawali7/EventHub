import Events from "../models/Events.js";
import User from "../models/User.js";

const createEvents = async (data, userId) => {
  const user = await User.findById(userId);
  return await Events.create({
    ...data,
    createdBy: userId,
    organizer: user?.club || null
  });
};


const getAllEvents = async () => {
  return await Events.find().populate("organizer", "name logo district");
};

const getEventById = async (eventId) => {
  return await Events.findById(eventId).populate("organizer", "name logo district email website");
};

const updateEvent = async (eventId, updatedData) => {
  return await Events.findByIdAndUpdate(eventId, updatedData, { new: true });
};

const deleteEvent = async (eventId) => {
  await Events.findByIdAndDelete(eventId);
}
export default { createEvents, getAllEvents, getEventById, updateEvent, deleteEvent };
