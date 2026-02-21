import mongoose from "mongoose";

const registerClubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    website: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
      unique: true, // Prevent duplicate club emails
    },
    logo: {
      type: String,
      require: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Link to the user who submitted the request
      require: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("RegisterClub", registerClubSchema);
