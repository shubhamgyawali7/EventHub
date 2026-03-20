import RegisterClub from "../models/RegisterClub.js";
import User from "../models/User.js";

const applyForClub = async (userId, clubData) => {
  // 1. Create the club entry in Pending status
  const newClub = await RegisterClub.create({
    ...clubData,
    createdBy: userId,
    status: "Pending"
  });

  // 2. Link this pending club to the User profile
  await User.findByIdAndUpdate(userId, { club: newClub._id });

  return newClub;
};

const approveClub = async (clubId) => {
  // console.log(`Approving club with ID: ${clubId}`);
  const club = await RegisterClub.findByIdAndUpdate(
    clubId,
    { status: "Approved", isVerified: true },
    { returnDocument: "after" }
  );
  // console.log(club);
  await User.findByIdAndUpdate(club.createdBy, {
    // Change user email to the Organization email
    //  email: club.email,
    $addToSet: { roles: "Club" }
  });
  // Now, the user John Doe can no longer log in with user email
  //  he must use club email with his original (user) password.
  return club;
};

const getPendingClubs = async () => {
  return await RegisterClub.find({ status: "Pending" }).populate("createdBy", "name email district college");
};

export default { applyForClub, approveClub, getPendingClubs };