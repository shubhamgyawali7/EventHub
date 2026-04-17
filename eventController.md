// controllers/eventsController.js
import eventService from "../services/eventService.js";

const addEvents = async (req, res) => {
  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: "Event poster is required" });
  }

  // Get the file path (relative to server root)
  const posterUrl = `/uploads/events/${req.file.filename}`;
  
  // Combine file data with form data
  const eventData = {
    ...req.body,
    poster: posterUrl,
  };
  
  const userId = req.user.id;

  // Validate required fields
  const requiredFields = ["title", "category", "district", "eventDate", "deadline", "venue"];
  const missingFields = requiredFields.filter((field) => !eventData[field]);

  if (missingFields.length > 0) {
    return res.status(422).json({ error: "Required data is missing", missingFields });
  }

  // Validate dates
  const eventDateTime = new Date(eventData.eventDate);
  const deadlineDate = new Date(eventData.deadline);
  const now = new Date();

  if (deadlineDate < now) {
    return res.status(422).json({ error: "Registration deadline cannot be in the past" });
  }

  if (eventDateTime < deadlineDate) {
    return res.status(422).json({ error: "Event date cannot be before registration deadline" });
  }

  try {
    // Check if user has a club
    const club = await eventService.getClubByUser(userId);
    if (!club) {
      return res.status(403).json({ error: "You need to be a verified club to create events" });
    }

    const newEvent = await eventService.createEvent({
      ...eventData,
      organizer: club._id,
      createdBy: userId,
    });

    res.status(201).json({ 
      message: "Event created successfully", 
      event: newEvent 
    });
  } catch (error) {
    // If there's an error, delete the uploaded file
    if (req.file) {
      const fs = await import("fs");
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
};

// Update event with file upload support
const updateEvent = async (req, res) => {
  const updatedData = { ...req.body };
  const eventId = req.params.id;
  const userId = req.user.id;

  // If new poster is uploaded, update the poster URL
  if (req.file) {
    updatedData.poster = `/uploads/events/${req.file.filename}`;
  }

  try {
    const event = await eventService.getEventById(eventId);
    if (!event) return res.status(404).json({ error: "Event Not Found" });

    if (event.createdBy.toString() !== userId) {
      // If file was uploaded but user not authorized, delete it
      if (req.file) {
        const fs = await import("fs");
        fs.unlinkSync(req.file.path);
      }
      return res.status(403).json({ error: "Unauthorized: You can only edit your own events" });
    }

    const updatedEvent = await eventService.updateEvent(eventId, updatedData);
    
    // If poster was updated and old poster exists, delete old file
    if (req.file && event.poster && event.poster !== updatedData.poster) {
      const fs = await import("fs");
      const oldPath = path.join(process.cwd(), event.poster);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    
    res.status(200).json(updatedEvent);
  } catch (error) {
    // If there's an error, delete the uploaded file
    if (req.file) {
      const fs = await import("fs");
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
};

// Delete event with file cleanup
const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;

  try {
    const event = await eventService.getEventById(eventId);
    if (!event) return res.status(404).json({ error: "Event Not Found" });

    if (event.createdBy.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized: You can only delete your own events" });
    }

    // Delete the poster file if it exists
    if (event.poster) {
      const fs = await import("fs");
      const filePath = path.join(process.cwd(), event.poster);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await eventService.deleteEvent(eventId);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addEvents, getAllEvents, getEventById, updateEvent, deleteEvent };