import Registration from "../models/Registration.js";
import Events from "../models/Events.js";
import registrationService from "../services/registrationService.js";

const registerForEvent = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id;
  const formData = req.body;

  try {
    console.log("🎟️ [BACKEND] registerForEvent called:", { eventId, userId });
    const response = await registrationService.registrationForEvnets(
      eventId,
      userId,
      formData,
    );
    console.log("📤 [BACKEND] Sending response:", response);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("❌ [BACKEND] registerForEvent error:", error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};

const getEventRegistrations = async (req, res) => {
  const { eventId } = req.params;
  try {
    const response = await registrationService.getEventRegistrations(eventId);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClubRegistrations = async (req, res) => {
  console.log("🎟️ [BACKEND] getClubRegistrations called");
  const userId = req.user.id;
  try {
    const response = await registrationService.getClubRegistrations(userId);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyRegistrations = async (req, res) => {
  const userId = req.user.id;
  try {
    const response = await registrationService.getMyRegistrations(userId);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  registerForEvent,
  getEventRegistrations,
  getClubRegistrations,
  getMyRegistrations,
};
