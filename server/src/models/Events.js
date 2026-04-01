import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    poster: { type: String, required: true },

    // 1. Added Enum for data integrity
    category: {
      type: String,
      required: true,
      enum: [
        "Workshop",
        "Competition",
        "Hackathon",
        "Seminar",
        "Meetup",
        "Conference",
        "Other",
      ],
    },

    district: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    eventDate: { type: Date, required: true },
    deadline: { type: Date, required: true },

    // 2. Capacity Management
    participantCount: { type: Number, default: 0, min: 0 },
    currentParticipants: { type: Number, default: 0, min: 0 },

    tags: { type: [String], default: [] },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RegisterClub",
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 3. Lifecycle Status
    status: {
      type: String,
      enum: ["draft", "published", "cancelled", "completed"],
      default: "published",
    },

    // 4. Monetization
    isPaid: { type: Boolean, default: false },
    price: { type: Number, default: 0, min: 0 },

    // 5. Geospatial Data
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [Long, Lat]
    },
    googleMapUrl: { type: String, trim: true },
  },
  { timestamps: true },
);

// 6. Middleware & Indexing
// eventSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// This allows you to perform "Events near me" queries. Without this, you can only filter by text (like District);
// with this, you can find events within a 5km radius of a user's GPS coordinates.
eventSchema.index({ location: "2dsphere" });
eventSchema.index({ district: 1, category: 1, eventDate: 1 });

export default mongoose.model("Event", eventSchema);
