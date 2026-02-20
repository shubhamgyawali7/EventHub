import express from "express";
import auth from "../middlewares/auth.js";
import {
  addEvents,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventsController.js";

const router = express.Router();

router.get("/", getAllEvents);

router.get("/:id", getEventById);

router.post("/", auth, addEvents);

router.put("/:id", auth, updateEvent);

router.delete("/:id", auth, deleteEvent);

export default router;
