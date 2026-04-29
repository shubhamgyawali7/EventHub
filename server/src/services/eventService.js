import Events from "../models/Events.js";
import RegisterClub from "../models/RegisterClub.js";
import User from "../models/User.js";
import {
  calculateRelevanceScore,
  sortEventsByRelevance,
} from "../utils/recommendationEngine.js";

// ─── Helpers ───────────────────────────────────────────────────────────────

const buildLocation = (data) => {
  // For online events, don't build location
  if (data.eventType === "online") {
    return null;
  }

  if (data.coordinates?.length === 2) {
    return {
      type: "Point",
      coordinates: [
        parseFloat(data.coordinates[0]),
        parseFloat(data.coordinates[1]),
      ],
    };
  }
  if (data.latitude && data.longitude) {
    return {
      type: "Point",
      coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)], // ← parseFloat here
    };
  }

  // Only return default location for physical events
  if (data.eventType === "physical") {
    return { type: "Point", coordinates: [85.324, 27.717] };
  }

  return null;
};

// ─── Club ──────────────────────────────────────────────────────────────────

const getClubByUser = async (userId) => {
  return await RegisterClub.findOne({ createdBy: userId, status: "Approved" });
};

// ─── Events ────────────────────────────────────────────────────────────────

const createEvent = async (data) => {
  console.log("🔌 [SERVICE] createEvent called");
  const location = buildLocation(data);
  console.log("📍 [SERVICE] Location prepared:", location);

  // Remove raw coordinate fields before saving
  const { coordinates, latitude, longitude, ...eventData } = data;
  console.log("📦 [SERVICE] Cleaned event data keys:", Object.keys(eventData));
  console.log("📦 [SERVICE] About to call Events.create()...");

  const savedEvent = await Events.create({ ...eventData, location });
  console.log(
    "✅ [SERVICE] Event.create() returned successfully, ID:",
    savedEvent._id,
  );
  return savedEvent;
};

const getAllEvents = async () => {
  return await Events.find().populate(
    "organizer",
    "name logo district email website facebook github instagram twitter linkedin youtube",
  );
};

const getEventById = async (eventId) => {
  return await Events.findById(eventId).populate(
    "organizer",
    "name logo district email website facebook github instagram twitter linkedin youtube",
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

const getNearbyEvents = async (
  longitude,
  latitude,
  radiusKm = 10,
  limit = 100,
) => {
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

const getRecommendedEvents = async (userId) => {
  const user = await User.findById(userId);
  const interests = (user?.interestedSkills || []).map((i) =>
    i.toLowerCase().trim(),
  );

  // 1. Get all published events
  let events = await Events.find({ status: "published" }).populate(
    "organizer",
    "name logo district",
  );

  if (interests.length > 0) {
    // Apply scoring from utility
    events = events.map((event) => ({
      ...event.toObject(),
      relevanceScore: calculateRelevanceScore(event, interests),
    }));

    // Apply sorting from utility
    events = sortEventsByRelevance(events);

    // Filter: Only show events that have at least some relevance match
    events = events.filter((event) => event.relevanceScore > 0);
  } else {
    // Default: Sort by date if no interests defined
    events.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
  }

  // Return top 10 matches
  return events.slice(0, 10);
};

export default {
  getClubByUser,
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getNearbyEvents,
  getRecommendedEvents,
};
