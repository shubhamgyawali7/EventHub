import Events from "../models/Events.js";
import RegisterClub from "../models/RegisterClub.js";

// ─── Helpers ───────────────────────────────────────────────────────────────

const buildLocation = (data) => {
  if (data.coordinates?.length === 2) {
    return { 
      type: "Point", 
      coordinates: [parseFloat(data.coordinates[0]), parseFloat(data.coordinates[1])] 
    };
  }
  if (data.latitude && data.longitude) {
    return { 
      type: "Point", 
      coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)]  // ← parseFloat here
    };
  }
  return { type: "Point", coordinates: [85.324, 27.717] };
};

// ─── Club ──────────────────────────────────────────────────────────────────

const getClubByUser = async (userId) => {
  return await RegisterClub.findOne({ createdBy: userId });
};

// ─── Events ────────────────────────────────────────────────────────────────

const createEvent = async (data) => {
  const location = buildLocation(data);
  console.log("📍 location built:", location); 
  // Remove raw coordinate fields before saving
  const { coordinates, latitude, longitude, ...eventData } = data;
  console.log("📦 eventData to save:", eventData); 
  return await Events.create({ ...eventData, location });
};

const getAllEvents = async () => {
  return await Events.find().populate("organizer", "name logo district");
};

const getEventById = async (eventId) => {
  return await Events.findById(eventId).populate(
    "organizer",
    "name logo district email website",
  );
};

const updateEvent = async (eventId, data) => {
  const location = buildLocation(data);

  // Remove raw coordinate fields before saving
  const { coordinates, latitude, longitude, ...updatedData } = data;

  return await Events.findByIdAndUpdate(
    eventId,
    { ...updatedData, location },
    { new: true },
  );
};

const deleteEvent = async (eventId) => {
  await Events.findByIdAndDelete(eventId);
};

const getNearbyEvents = async (longitude, latitude, radiusKm = 10, limit = 100) => {
  const radiusMeters = radiusKm * 1000;

  return await Events.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [longitude, latitude] },
        $maxDistance: radiusMeters,
      },
    },
    status: "published",
  })
    .populate("organizer", "name logo district")
    .limit(limit);
};

export default {
  getClubByUser,
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getNearbyEvents,
};