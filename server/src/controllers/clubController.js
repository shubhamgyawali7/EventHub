import clubService from "../services/clubService.js";

const submitClubRegistration = async (req, res) => {
  console.log("I am at Controller of Club !!!");
  try {
    const data = req.body;
    const userId = req.user.id;
    console.log("Frontend Data in backend=>", data);
    const club = await clubService.applyForClub(userId, data);
    console.log("Backend Data in Frontend=>", club);
    res.status(201).json({
      message: "Club application submitted. Pending Admin approval.",
      club,
    });
  } catch (error) {
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
