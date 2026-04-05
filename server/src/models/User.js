import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  address: {
    type: String,
  },
district:{
    type: String,
    require: true,
},
  college: {
    type: String,
  },

  email: {
    type: String,
    require: true,
    unique: true, // Recommended for authentication
  },

  password: {
    type: String,
    require: true,
  },

  profilePicture: {
    type: String,
    default: "", // Path to the uploaded photo
  },

  bio: {
    type: String,
    maxlength: 250,
  },

  interestedSkills: {
    type: [String],
    default: [], // Array of skills like ['React', 'Node.js', etc.]
  },

  roles: {
    type: [String],
    enum: ["Student", "Club", "Admin"], 
    default: ["Student"], // Default to Student during first registration
  },

  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RegisterClub", // Link to the club they created
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
