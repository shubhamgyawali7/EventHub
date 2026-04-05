import mongoose from 'mongoose';
import RegisterClub from '../models/RegisterClub.js';
import User from '../models/User.js';
import Events from '../models/Events.js';
import { sendVerificationEmail } from '../utils/emailService.js';

const applyForClub = async (userId, clubData) => {
  console.log("I am at Service of Club !!!");
  console.log("Club Data Before Database", clubData);
  const newClub = await RegisterClub.create({
    ...clubData,
    createdBy: userId,
    status: "Pending",
    isVerified: false,
  });
  console.log("Club Data After Database", newClub);
  await User.findByIdAndUpdate(userId, { club: newClub._id });
  return newClub;
};

const updateClubProfile = async (userId, updateData) => {
  const club = await RegisterClub.findOne({ createdBy: userId });
  if (!club) {
    throw new Error("Club not found");
  }

  const updatedClub = await RegisterClub.findByIdAndUpdate(
    club._id,
    { ...updateData },
    { returnDocument: 'after' },
  ).populate("createdBy", "name email district college");

  return updatedClub;
};

const approveClub = async (clubId) => {
  const club = await RegisterClub.findByIdAndUpdate(
    clubId,
    { status: "Approved", isVerified: true },
    { returnDocument: 'after' },
  ).populate("createdBy", "name email district college");

  if (club && club.createdBy) {
    await User.findByIdAndUpdate(club.createdBy._id, {
      $addToSet: { roles: "Club" },
    });
    
    // 📧 Phase 4: Send the welcome email
    await sendVerificationEmail(club.email, club.name);
  }
  return club;
};

const rejectClub = async (clubId) => {
  const club = await RegisterClub.findByIdAndUpdate(
    clubId,
    { status: "Rejected", isVerified: false },
    { returnDocument: 'after' },
  ).populate("createdBy", "name email district college");

  if (club && club.createdBy) {
    await User.findByIdAndUpdate(club.createdBy._id, {
      $pull: { roles: "Club" },
    });
  }

  return club;
};

const getPendingClubs = async () => {
  return await RegisterClub.find({ status: "Pending" }).populate(
    "createdBy",
    "name email district college",
  );
};

const getAllClubs = async () => {
  try {
    const clubs = await RegisterClub.find({})
      .populate("createdBy", "name email district college")
      .sort({ createdAt: -1 });
    return clubs;
  } catch (error) {
    console.error("Error in getAllClubs service:", error);
    throw error;
  }
};

const getAllCreatedEvents = async (createdBy) => {
  try {
    // First check if Events model exists and has data
    const events = await Events.find({ createdBy: createdBy })
      .populate("organizer", "name") // Populate organizer details if needed
      .sort({ createdAt: -1 });

    console.log(`Found ${events.length} events for user ${createdBy}`);
    return events;
  } catch (error) {
    console.error("Error in getAllCreatedEvents:", error);
    throw error;
  }
};

// const getAllCreatedEvents = async (createdBy) => {
//   const allevents = await Events.aggregate([
//     {
//       $match: { createdBy: new mongoose.Types.ObjectId(createdBy) },
//     },
//     {
//       $lookup: {
//         from: "registerclubs",
//         localField: "organizer",
//         foreignField: "_id",
//         as: "organizerDetails",
//       },
//     },
//     {
//       $project: {
//         _id: 1,
//         title: 1,
//         description: 1,
//         poster: 1,
//         category: 1,
//         district: 1,
//         venue: 1,
//         deadline: 1,
//         eventDate: 1,
//         participantCount: 1,
//         organizer: 1,
//         createdBy: 1,
//         timestamp: 1,
//         organizerDetails: { $arrayElemAt: ["$organizerDetails", 0] }, // Get first element if exists
//       },
//     },
//   ]);

//   return allevents;
// };

const getClubByUserId = async (userId) => {
  return await RegisterClub.findOne({ createdBy: userId });
};

// Add delete event function
const deleteEvent = async (eventId, userId) => {
  try {
    // First find the event
    const event = await Events.findById(eventId);
    
    if (!event) {
      throw new Error("Event not found");
    }
    
    // Check if the user owns this event
    if (event.createdBy.toString() !== userId) {
      throw new Error("Not authorized to delete this event");
    }
    
    // Delete the event
    await Events.findByIdAndDelete(eventId);
    return { success: true, message: "Event deleted successfully" };
  } catch (error) {
    console.error("Error in deleteEvent:", error);
    throw error;
  }
};

export default {
  applyForClub,
  updateClubProfile,
  approveClub,
  rejectClub,
  getPendingClubs,
  getClubByUserId,
  getAllCreatedEvents,
  getAllClubs,
  deleteEvent
};
