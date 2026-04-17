import Event from "../models/Events.js";
import Registration from "../models/Registration.js";

const registrationForEvnets = async (eventId, userId, formData) => {
  console.log("🎟️ [BACKEND] Registering student for event:", {
    eventId,
    userId,
    formData,
  });
  // check event exists
  const event = await Event.findById(eventId);
  if (!event) {
    console.log("❌ [BACKEND] Event not found:", eventId);
    return { status: 404, data: { error: "Event not found" } };
  }

  // Check if student already registered
  const existing = await Registration.findOne({ event: eventId, user: userId });
  if (existing) {
    console.log("⚠️ [BACKEND] Student already registered:", {
      eventId,
      userId,
    });
    return {
      status: 400,
      data: { message: "Already registered for this event" },
    };
  }

  try {
    const newRegistration = new Registration({
      event: eventId,
      user: userId,
      paymentService: event.isPaid ? "Khalti" : "None", // Set payment service based on event type
      status: event.isPaid ? "Pending" : "Confirmed", // Paid events start as Pending until payment is verified
      paymentInfo: event.isPaid
        ? {
            amount: event.price,
            transactionId: null, // To be filled after payment verification
            paymentDate: null, // To be filled after payment verification
          }
        : null,

      ...formData, // Spread the custom form data (name, email, phone, etc.)
    });

    await newRegistration.save();

    // Only increment participant count if confirmed (Free event)
    if (newRegistration.status === "Confirmed") {
      event.participantCount += 1;
      await event.save();
    }

    console.log("✅ [BACKEND] Registration successful:", {
      registrationId: newRegistration._id,
      status: newRegistration.status,
    });
    return {
      status: 201,
      data: {
        message: "Registered successfully!",
        registration: newRegistration,
      },
    };
    
  } catch (error) {
    console.error("❌ [BACKEND] Registration failed:", error);
    return { status: 500, data: { error: error.message } };
  }
};

const getEventRegistrations = async (eventId) => {
  try {
    const registrations = await Registration.find({ event: eventId }).populate(
      "user",
      "name email",
    );
 return { status: 200, data: registrations };
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClubRegistrations = async (userId) => {
  try {
    // Find all events created by this user
    const clubEvents = await Event.find({ createdBy: userId }).select("_id");
    const eventIds = clubEvents.map((e) => e._id);

    // Find all registrations for these events
    const registrations = await Registration.find({ event: { $in: eventIds } })
      .populate("user", "name email district college")
      .populate("event", "title eventDate");

 return { status: 200, data: registrations };
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyRegistrations = async (userId) => {
  try {
    const registrations = await Registration.find({ user: userId }).populate(
      "event",
      "title eventDate poster isPaid price district venue",
    );
    return { status: 200, data: registrations }; // ← return, don't res.json()
  } catch (error) {
    return { status: 500, data: { error: error.message } };
  }
};

export default {
  registrationForEvnets,
  getEventRegistrations,
  getClubRegistrations,
  getMyRegistrations,
};
