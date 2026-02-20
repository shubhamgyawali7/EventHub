import mongoose from "mongoose";

const registerClubSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  website: {
    type: String,
    require: true,
  },
distict:{
    type: String,
    require: true,
},

  email: {
    type: String,
    require: true,
    lowercase: true,
  },
  logo: {
    type: String,
    require: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("RegisterClub", registerClubSchema);
