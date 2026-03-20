import Registration from "../models/Registration.js";
import Events from "../models/Events.js";

const registerForEvent = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id;
    const formData = req.body;

    try {
        // Check if event exists
        const event = await Events.findById(eventId);
        if (!event) return res.status(404).json({ error: "Event not found" });

        // Check if already registered
        const existing = await Registration.findOne({ event: eventId, user: userId });
        if (existing) return res.status(400).json({ error: "Already registered for this event" });

        // Create registration
        const newRegistration = await Registration.create({
            event: eventId,
            user: userId,
            ...formData
        });

        // Increment participant count
        await Events.findByIdAndUpdate(eventId, { $inc: { participantCount: 1 } });

        res.status(201).json({ message: "Registered successfully!", registration: newRegistration });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEventRegistrations = async (req, res) => {
    const { eventId } = req.params;
    try {
        const registrations = await Registration.find({ event: eventId }).populate("user", "name email");
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getClubRegistrations = async (req, res) => {
    const userId = req.user.id;
    try {
        // Find all events created by this user
        const clubEvents = await Events.find({ createdBy: userId }).select("_id");
        const eventIds = clubEvents.map(e => e._id);

        // Find all registrations for these events
        const registrations = await Registration.find({ event: { $in: eventIds } })
            .populate("user", "name email district college")
            .populate("event", "title eventDate");

        res.json(registrations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { registerForEvent, getEventRegistrations, getClubRegistrations };
