import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Confirmed", "Pending", "Cancelled", "Failed"],
      default: "Confirmed",
    },
    paymentInfo: {
      type: {
        amount: Number,
        transactionId: String,
        paymentDate: Date,
      },
      default: null,
    },
    paymentService: {
      type: String,
      enum: ["Khalti", "eSewa", "GoogleForm", "None"],
      default: "None",
    },
    // Custom form data for the specific event
    name: String,
    email: String,
    phone: String,
    college: String,
    remarks: String,
  },
  { timestamps: true },
);

// Prevent duplicate registrations
registrationSchema.index({ event: 1, user: 1 }, { unique: true });

export default mongoose.model("Registration", registrationSchema);
