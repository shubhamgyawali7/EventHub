import Events from "../models/Events.js";
import User from "../models/User.js";

const createEvents = async (data, userId) => {
  const user = await User.findById(userId);

  // If coordinates are provided, set location properly
  let location = null;
  if (data.coordinates && data.coordinates.length === 2) {
    location = {
      type: "Point",
      coordinates: data.coordinates, // [longitude, latitude]
    };
  } else if (data.latitude && data.longitude) {
    location = {
      type: "Point",
      coordinates: [data.longitude, data.latitude],
    };
  }

  try {
    return await Events.create({
      ...data,
      createdBy: userId,
      organizer: user?.club || null,
      location: location || {
        type: "Point",
        coordinates: [85.324, 27.717], // Default to Kathmandu
      },
    });
  } catch (error) {
    return error;
  }
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

const updateEvent = async (eventId, updatedData) => {
  // Handle location update if coordinates are provided
  if (updatedData.coordinates && updatedData.coordinates.length === 2) {
    updatedData.location = {
      type: "Point",
      coordinates: updatedData.coordinates,
    };
    delete updatedData.coordinates;
  } else if (updatedData.latitude && updatedData.longitude) {
    updatedData.location = {
      type: "Point",
      coordinates: [updatedData.longitude, updatedData.latitude],
    };
    delete updatedData.latitude;
    delete updatedData.longitude;
  }

  return await Events.findByIdAndUpdate(eventId, updatedData, { new: true });
};

const deleteEvent = async (eventId) => {
  await Events.findByIdAndDelete(eventId);
};

const getNearbyEvents = async (
  longitude,
  latitude,
  radiusKm = 10,
  limit = 100,
) => {
  // Convert radius from km to meters (MongoDB uses meters)
  const radiusMeters = radiusKm * 1000;

  return await Events.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: radiusMeters,
      },
    },
    status: "published", // Only show published events
  })
    .populate("organizer", "name logo district")
    .limit(limit);
};

export default {
  createEvents,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getNearbyEvents,
};
