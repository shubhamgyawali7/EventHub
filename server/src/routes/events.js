import express from "express";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { uploadEventPoster, handleMulterError } from "../middlewares/upload.js";
import {
  addEvents,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventsController.js";

const router = express.Router();

// GET /api/events?lat=27.717&lng=85.324&radius=10 - for nearby events
// GET /api/events - for all events

router.post("/create", auth, uploadEventPoster, handleMulterError, addEvents);

router.get("/", getAllEvents);

router.get("/:id", getEventById);


router.put("/:id", auth, uploadEventPoster, handleMulterError, updateEvent);

router.delete("/:id", auth, deleteEvent);

export default router;
