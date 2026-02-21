import express from "express";
import auth from "../middlewares/auth.js";
import {
  addEvents,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getOrganizerEvents, // ✅ import new controller
} from "../controllers/eventsController.js";

const router = express.Router();

// Public routes
router.get("/", getAllEvents);
router.get("/:id", getEventById);

// Protected routes
router.post("/", auth, addEvents);
router.put("/:id", auth, updateEvent);
router.delete("/:id", auth, deleteEvent);

// ✅ New: Organizer-specific route
router.get("/organizer", auth, getOrganizerEvents);

export default router;
