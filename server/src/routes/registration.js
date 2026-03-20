import express from "express";
import { registerForEvent, getEventRegistrations, getClubRegistrations } from "../controllers/registrationController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
router.get("/club/all", auth, getClubRegistrations);
router.post("/:eventId", auth, registerForEvent);
router.get("/:eventId", auth, getEventRegistrations);

export default router;
