import mongoose from "mongoose";
import eventService from "../services/eventService.js";

// Create a new event
const addEvents = async (req, res) => {
  const eventData = req.body;
  const userId = req.user.id;

  if (
    !eventData.title ||
    !eventData.category ||
    !eventData.district ||
    !eventData.eventDate ||
    !eventData.poster ||
    !eventData.deadline
  ) {
    return res.status(422).json({ message: "Required data is missing." });
  }

  try {
    const newEvent = await eventService.createEvents(eventData, userId);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching all events:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  const eventId = req.params.id;

  // ✅ Validate before querying
  if (!mongoose.isValidObjectId(eventId)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const event = await eventService.getEventById(eventId);
    if (!event) return res.status(404).json({ message: "Event Not Found" });
    res.json(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update event
const updateEvent = async (req, res) => {
  const updatedData = req.body;
  const eventId = req.params.id;

  // ✅ Validate before querying
  if (!mongoose.isValidObjectId(eventId)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const changeEvent = await eventService.updateEvent(eventId, updatedData);
    res.status(200).json(changeEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  const eventId = req.params.id;

  // ✅ Validate before querying
  if (!mongoose.isValidObjectId(eventId)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    await eventService.deleteEvent(eventId);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get events created by the logged-in organizer
const getOrganizerEvents = async (req, res) => {
  try {
    const organizerId = req.user.id;

    // ✅ Validate before querying
    if (!mongoose.isValidObjectId(organizerId)) {
      return res.status(400).json({ message: "Invalid organizer ID" });
    }

    const events = await eventService.getEventsByOrganizer(organizerId);
    res.status(200).json(events || []);
  } catch (error) {
    console.error("Error fetching organizer events:", error);
    res.status(500).json({ message: error.message });
  }
};

export {
  addEvents,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getOrganizerEvents,
};
