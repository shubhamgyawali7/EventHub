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
  updateGoogleSheetLink,
} from "../controllers/eventsController.js";

const router = express.Router();

router.get("/diag/ping", (req, res) => res.json({ status: "Events Router is Online" }));

// GET /api/events?lat=27.717&lng=85.324&radius=10 - for nearby events
// GET /api/events - for all events

router.post("/create", auth, uploadEventPoster, handleMulterError, addEvents);

router.get("/", getAllEvents);

router.patch("/integration/google-sheet/:id", auth, updateGoogleSheetLink);

router.get("/:id", getEventById);

router.put("/:id", auth, uploadEventPoster, handleMulterError, updateEvent);

router.delete("/:id", auth, deleteEvent);

export default router;
