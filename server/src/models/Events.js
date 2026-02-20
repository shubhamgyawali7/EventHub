import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  poster :{  // URL to the event poster image
    type: String,
    required: true, 
  },

  category: {
    type: String,
    required: true, // e.g., workshop, hackathon
  },
  district: {
    type: String,
    required: true, // For location filtering
  },

  venue: String,

  deadline: {
    type: Date,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  participantCount: {
    type: Number,
    default: 0,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RegisterClub",
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});
export default mongoose.model("Event", eventSchema);
