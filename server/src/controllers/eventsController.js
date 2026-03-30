import eventService from "../services/eventService.js";

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
    return res.status(422).send("Required data is missing....");
  }

  try {
        console.log("Event Data before database =>", eventData);
    const newEvent = await eventService.createEvents(eventData, userId);
    console.log("Event Data after database =>", newData);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllEvents = async (req, res) => {
  const { lat, lng, radius, limit } = req.query;
  let events;
  try {
    if (lat && lng) {
      // Use geospatial query for nearby events
      events = await eventService.getNearbyEvents(
        parseFloat(lng),
        parseFloat(lat),
        radius ? parseFloat(radius) : 10, // Default 10km radius
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
    res.json(event);
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

    // Check ownership
    if (event.createdBy.toString() !== userId) {
      return res
        .status(403)
        .send("Unauthorized: You can only edit your own events");
    }

    const changeEvent = await eventService.updateEvent(eventId, updatedData);
    res.status(200).json(changeEvent);
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

    // Check ownership
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
