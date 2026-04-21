import clubService from "../services/clubService.js";
import cloudinary from "../config/cloudinary.js";

const submitClubRegistration = async (req, res) => {
  console.log("\n=== CLUB REGISTRATION ===");
  console.log("Content-Type:", req.headers['content-type']);
  console.log("req.body:", req.body);
  console.log("req.file:", req.file ? `${req.file.originalname} (${req.file.size} bytes)` : "none");

  try {
    const data = { ...req.body };
    const userId = req.user.id;

    // Upload logo buffer to Cloudinary manually
    if (req.file) {
      try {
        const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const uploadResult = await cloudinary.uploader.upload(base64, {
          folder: "eventhub/clubs",
          transformation: [{ width: 500, height: 500, crop: "limit", quality: "auto" }],
        });
        data.logo = uploadResult.secure_url;
        console.log("Cloudinary upload success:", data.logo);
      } catch (uploadErr) {
        console.error("Cloudinary upload error:", uploadErr.message);
        return res.status(500).json({ error: "Logo upload failed: " + uploadErr.message });
      }
    }

    console.log("Final data to service:", data);
    const club = await clubService.applyForClub(userId, data);
    res.status(201).json({
      message: "Club application submitted. Pending Admin approval.",
      club,
    });
  } catch (error) {
    console.error("Club registration error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateClubProfile = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const updatedClub = await clubService.updateClubProfile(userId, data);
    res.status(200).json({
      message: "Club profile updated successfully",
      club: updatedClub,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPendingClubs = async (req, res) => {
  try {
    const pendingClubs = await clubService.getPendingClubs();
    res.status(200).json(pendingClubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllClubs = async (req, res) => {
  try {
    const allClubs = await clubService.getAllClubs();
    console.log(`Found ${allClubs.length} clubs`);
    res.status(200).json(allClubs);
  } catch (error) {
    console.error("Error in getAllClubs:", error);
    res.status(500).json({ error: error.message });
  }
};


// const getAllCreatedEvents = async (req,res) => {
//    const userId = req.user.id;
//    try {
//     const events = await clubService.getAllCreatedEvents(userId);
//     if(!events) return res.status(401).send("No Events Created....");

//     res.status(201).json(events);
//    }catch(error){
//     res.status(501).send(error.message);
//    }
// };

const getAllCreatedEvents = async (req, res) => {
  const userId = req.user.id;
  try {
    const events = await clubService.getAllCreatedEvents(userId);
    if (!events || events.length === 0) {
      return res.status(200).json([]); // Return empty array instead of 404
    }
    res.status(200).json(events);
  } catch (error) {
    console.error("Error in getAllCreatedEvents:", error);
    res.status(500).json({ error: error.message });
  }
};

// Add delete event controller
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  try {
    const result = await clubService.deleteEvent(id, userId);
    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      data: result
    });
  } catch (error) {
    console.error("Error in deleteEvent:", error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

const adminApproveClub = async (req, res) => {
  const clubId = req.params.id;
  console.log(`Received request to approve club with ID: ${clubId}`);
  try {
    const approvedClub = await clubService.approveClub(clubId);
    console.log(`Email sent to ${approvedClub.email} with dashboard URL.`);
    res
      .status(200)
      .json({ message: "Club approved and user upgraded.", approvedClub });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adminRejectClub = async (req, res) => {
  const clubId = req.params.id;
  console.log(`Rejecting club with ID: ${clubId}`);
  try {
    const rejectedClub = await clubService.rejectClub(clubId);
    res.status(200).json({
      message: "Club rejected successfully.",
      club: rejectedClub,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClubStatus = async (req, res) => {
  try {
    const club = await clubService.getClubByUserId(req.user.id);
    if (!club) {
      return res.status(404).json({ message: "No club registration found." });
    }
    res.status(200).json(club);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  submitClubRegistration,
  updateClubProfile,
  getPendingClubs,
  getAllClubs,
  getAllCreatedEvents,
  adminApproveClub,
  adminRejectClub,
  getClubStatus,
  deleteEvent
};
