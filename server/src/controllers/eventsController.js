import eventService from "../services/eventService.js";
import mongoose from "mongoose";
// import fs from "fs";

const addEvents = async (req, res) => {
  // console.log("\n════════ [BACKEND] EVENT CREATE REQUEST ════════");
  // console.log("✅ [BACKEND] Reached addEvents controller");
  console.log("👤 [BACKEND] User ID:", req.user?.id);
  // console.log(
  //   "📎 [BACKEND] File received:",
  //   req.file ? req.file.filename : "NO FILE",
  // );
  // console.log("📤 [BACKEND] Body keys:", Object.keys(req.body));
  // console.log("📤 [BACKEND] Body content:", req.body);

  const eventData = req.body;
  const userId = req.user.id;

  if (!req.file) {
    console.error("❌ [BACKEND] No file - rejecting request");
    return res.status(400).json({ error: "Event poster is required" });
  }

  const posterUrl = `/uploads/events/${req.file.filename}`;

  // Validate eventType
  const eventType = eventData.eventType || "physical";
  if (!["online", "physical"].includes(eventType)) {
    return res.status(422).json({
      error: "Invalid eventType. Must be 'online' or 'physical'",
    });
  }

  // Validate required fields (venue only required for physical events)
  const requiredFields = [
    "title",
    "category",
    "district",
    "eventDate",
    "deadline",
  ];

  // Venue is required only for physical events
  if (eventType === "physical") {
    requiredFields.push("venue");
  }

  const missingFields = requiredFields.filter((field) => !eventData[field]);
  console.log("✓ [BACKEND] Required fields:", requiredFields);
  console.log("✓ [BACKEND] Missing fields:", missingFields);

  if (missingFields.length > 0) {
    console.error(
      "❌ [BACKEND] VALIDATION FAILED - Missing fields:",
      missingFields,
    );
    return res.status(422).json({
      error: "Required data is missing from requiredFields",
      missingFields,
    });
  }

  // Validate dates - combine eventDate and eventTime
  let eventDateTime;
  if (eventData.eventDate && eventData.eventTime) {
    eventDateTime = new Date(`${eventData.eventDate}T${eventData.eventTime}`);
    console.log(
      "⏰ [BACKEND] Combined date+time:",
      `${eventData.eventDate}T${eventData.eventTime}`,
      "→",
      eventDateTime.toISOString(),
    );
  } else if (eventData.eventDate) {
    eventDateTime = new Date(eventData.eventDate);
    console.log(
      "⏰ [BACKEND] Using eventDate only:",
      eventData.eventDate,
      "→",
      eventDateTime.toISOString(),
    );
  } else {
    console.error("❌ [BACKEND] Event date is required");
    return res.status(422).json({ error: "Event date is required" });
  }

  const deadlineDate = new Date(eventData.deadline);
  const now = new Date();
  console.log("⏰ [BACKEND] Date validation -", {
    eventDateTime: eventDateTime.toISOString(),
    deadlineDate: deadlineDate.toISOString(),
  });

  if (deadlineDate < now) {
    console.error("❌ [BACKEND] Deadline in past - rejecting");
    return res
      .status(422)
      .json({ error: "Registration deadline cannot be in the past" });
  }

  if (eventDateTime < deadlineDate) {
    console.error("❌ [BACKEND] Event date before deadline - rejecting");
    return res
      .status(422)
      .json({ error: "Event date cannot be before registration deadline" });
  }
  console.log("✓ [BACKEND] Date validation PASSED");

  try {
    console.log("🔍 [BACKEND] Checking if user has a club...");
    // Check if user has a club (delegated to service)
    const club = await eventService.getClubByUser(userId);
    if (!club) {
      console.error("❌ [BACKEND] User has no verified club - rejecting");
      return res
        .status(403)
        .json({ error: "You need to be a verified club to create events" });
    }
    console.log("✓ [BACKEND] Club found:", club.name);

    const participantCount = parseInt(eventData.participantCount) || 0;
    const isPaid = eventData.isPaid === "true" || eventData.isPaid === true;
    const tags = eventData.tags
      ? eventData.tags.split(",").map((t) => t.trim())
      : [];
    let googleFormUrls = [];
    if (eventData.googleFormUrls) {
      try {
        googleFormUrls = JSON.parse(eventData.googleFormUrls);
      } catch (e) {
        googleFormUrls = [];
      }
    }
    console.log("✓ [BACKEND] Parsed form values:", {
      participantCount,
      isPaid,
      tagsCount: tags.length,
      googleFormUrlsCount: googleFormUrls.length,
    });

    // Build event data object
    const eventDataToCreate = {
      ...eventData,
      eventType,
      eventDate: eventDateTime,
      isPaid,
      tags,
      deadline: deadlineDate,
      participantCount,
      poster: posterUrl,
      organizer: club._id,
      createdBy: new mongoose.Types.ObjectId(userId),
      googleFormUrls,
    };

    // For online events, remove venue and location
    if (eventType === "online") {
      console.log("🌐 [BACKEND] Online event - removing venue and location");
      delete eventDataToCreate.venue;
      delete eventDataToCreate.location;
    }

    console.log("💾 [BACKEND] SAVING EVENT TO DATABASE...");
    console.log("💾 [BACKEND] Event data summary:", {
      title: eventDataToCreate.title,
      eventType: eventDataToCreate.eventType,
      eventDate: eventDataToCreate.eventDate,
      organizer: eventDataToCreate.organizer,
      createdBy: eventDataToCreate.createdBy,
      poster: eventDataToCreate.poster,
    });

    const newEvent = await eventService.createEvent(eventDataToCreate);

    console.log("✅ [BACKEND] EVENT CREATED SUCCESSFULLY!");
    console.log("✅ [BACKEND] Event ID:", newEvent._id);
    console.log("✅ [BACKEND] Event Title:", newEvent.title);
    console.log("════════════════════════════════════════\n");

    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (error) {
    console.error("\n❌ [BACKEND] ERROR IN TRY BLOCK:");
    console.error("❌ Error message:", error.message);
    console.error("❌ Error stack:", error.stack);
    console.error("════════════════════════════════════════\n");
    // If there's an error, delete the uploaded file
    if (req.file) {
      try {
        const fs = await import("fs");
        fs.default.unlinkSync(req.file.path);
        console.log("🗑️ [BACKEND] Deleted uploaded file due to error");
      } catch (fsError) {
        console.error("⚠️ [BACKEND] Could not delete file:", fsError.message);
      }
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
  const eventId = req.params.id;
  const userId = req.user.id;
  const updatedData = { ...req.body };

  try {
    const event = await eventService.getEventById(eventId);
    if (!event) return res.status(404).json({ error: "Event Not Found" });

    if (event.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You can only edit your own events" });
    }

    // Handle new poster if uploaded
    if (req.file) {
      updatedData.poster = `/uploads/events/${req.file.filename}`;
    }

    // Parse numeric/boolean fields from FormData
    if (updatedData.participantCount !== undefined) {
      updatedData.participantCount =
        parseInt(updatedData.participantCount) || 0;
    }
    if (updatedData.isPaid !== undefined) {
      updatedData.isPaid =
        updatedData.isPaid === "true" || updatedData.isPaid === true;
    }
    if (updatedData.price !== undefined) {
      updatedData.price = parseFloat(updatedData.price) || 0;
    }

    // Parse tags if provided as string
    if (typeof updatedData.tags === "string") {
      updatedData.tags = updatedData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    // Parse googleFormUrls if provided as JSON string
    if (
      updatedData.googleFormUrls &&
      typeof updatedData.googleFormUrls === "string"
    ) {
      try {
        updatedData.googleFormUrls = JSON.parse(updatedData.googleFormUrls);
      } catch (e) {
        updatedData.googleFormUrls = [];
      }
    }

    // Validate eventType if provided
    if (
      updatedData.eventType &&
      !["online", "physical"].includes(updatedData.eventType)
    ) {
      return res.status(422).json({
        error: "Invalid eventType. Must be 'online' or 'physical'",
      });
    }

    const eventType = updatedData.eventType || event.eventType || "physical";

    // Combine eventDate and eventTime if both provided
    if (updatedData.eventDate && updatedData.eventTime) {
      updatedData.eventDate = new Date(
        `${updatedData.eventDate}T${updatedData.eventTime}`,
      );
    } else if (updatedData.eventDate) {
      updatedData.eventDate = new Date(updatedData.eventDate);
    }

    // For online events, remove venue and location
    if (eventType === "online") {
      updatedData.venue = "";
      updatedData.location = null;
    }

    const result = await eventService.updateEvent(eventId, updatedData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in updateEvent:", error);
    res.status(500).json({ error: error.message });
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
