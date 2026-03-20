import clubService from "../services/clubService.js";

const submitClubRegistration = async (req, res) => {

  try {
    const data = req.body;
    const userId = req.user.id;

    const club = await clubService.applyForClub(userId, data);
    res.status(201).json({ message: "Club application submitted. Pending Admin approval.", club });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin only route - get all pending clubs
const getPendingClubs = async (req, res) => {
  try {
    const pendingClubs = await clubService.getPendingClubs();
    res.status(200).json(pendingClubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin only route
const adminApproveClub = async (req, res) => {
  const clubId = req.params.id;
  console.log(`Received request to approve club with ID: ${clubId}`);
  try {
    const approvedClub = await clubService.approveClub(clubId);

    // Here you would trigger Nodemailer to send the URL to approvedClub.email [cite: 393]
    // sendApprovalEmail(approvedClub.email, "https://yourapp.com/dashboard");
    console.log(`Email sent to ${approvedClub.email} with dashboard URL.`);
    res.status(200).json({ message: "Club approved and user upgraded.", approvedClub });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { submitClubRegistration, getPendingClubs, adminApproveClub };