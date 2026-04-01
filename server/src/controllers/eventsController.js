import eventService from "../services/eventService.js";
import mongoose from "mongoose"; 
// import fs from "fs";

const addEvents = async (req, res) => {
  // console.log("Files:", req.file); // Should show your uploaded poster
  // console.log("Body:", req.body); // Should show your text fields
  console.log("✅ Reached addEvents");
  const eventData = req.body;
  const userId = req.user.id;

  // console.log("Evennt data:", eventData);

  if (!req.file) {
    return res.status(400).json({ error: "Event poster is required" });
  }

  const posterUrl = `/uploads/events/${req.file.filename}`;

  // Validate required fields
  const requiredFields = [
    "title",
    "category",
    "district",
    "eventDate",
    "deadline",
    "venue",
  ];
  const missingFields = requiredFields.filter((field) => !eventData[field]);

  if (missingFields.length > 0) {
    return res.status(422).json({
      error: "Required data is missing from requiredFields",
      missingFields,
    });
  }

  // Validate dates
  const eventDateTime = new Date(eventData.eventDate);
  const deadlineDate = new Date(eventData.deadline);
  const now = new Date();

  if (deadlineDate < now) {
    return res
      .status(422)
      .json({ error: "Registration deadline cannot be in the past" });
  }

  if (eventDateTime < deadlineDate) {
    return res
      .status(422)
      .json({ error: "Event date cannot be before registration deadline" });
  }

  try {
    // Check if user has a club (delegated to service)
    const club = await eventService.getClubByUser(userId);
    if (!club) {
      return res
        .status(403)
        .json({ error: "You need to be a verified club to create events" });
    }

    const participantCount = parseInt(eventData.participantCount) || 0;
    const isPaid = eventData.isPaid === "true" || eventData.isPaid === true;
    const tags = eventData.tags
      ? eventData.tags.split(",").map((t) => t.trim())
      : [];
    const eventDateTime = new Date(eventData.eventDate);
    const deadlineDate = new Date(eventData.deadline);

    const newEvent = await eventService.createEvent({
      ...eventData,
      eventDate: eventDateTime,
      isPaid,
      tags,
      deadline: deadlineDate,
      participantCount,
      poster: posterUrl,
      organizer: club._id,
      createdBy: new mongoose.Types.ObjectId(userId),
    });

    console.log("New Event Created:", newEvent);

    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (error) {
    // If there's an error, delete the uploaded file
    if (req.file) {
      const fs = await import("fs");
      fs.default.unlinkSync(req.file.path);
      //  fs.unlinkSync(req.file.path);
    }
    console.error("Validation Error Details:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getAllEvents = async (req, res) => {
  const { lat, lng, radius, limit } = req.query;

  try {
    let events;

    if (lat && lng) {
      events = await eventService.getNearbyEvents(
        parseFloat(lng),
        parseFloat(lat),
        radius ? parseFloat(radius) : 10,
        limit ? parseInt(limit) : 100,
      );
    } else {
      events = await eventService.getAllEvents();
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getEventById = async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await eventService.getEventById(eventId);
    if (!event) return res.status(404).send("Event Not Found");

    res.status(200).json(event);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateEvent = async (req, res) => {
  const updatedData = req.body;
  const eventId = req.params.id;
  const userId = req.user.id;

  try {
    const event = await eventService.getEventById(eventId);
    if (!event) return res.status(404).send("Event Not Found");

    if (event.createdBy.toString() !== userId) {
      return res
        .status(403)
        .send("Unauthorized: You can only edit your own events");
    }

    const updatedEvent = await eventService.updateEvent(eventId, updatedData);
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;

  try {
    const event = await eventService.getEventById(eventId);
    if (!event) return res.status(404).send("Event Not Found");

    if (event.createdBy.toString() !== userId) {
      return res
        .status(403)
        .send("Unauthorized: You can only delete your own events");
    }

    await eventService.deleteEvent(eventId);
    res.status(200).send("Event deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { addEvents, getAllEvents, getEventById, updateEvent, deleteEvent };
