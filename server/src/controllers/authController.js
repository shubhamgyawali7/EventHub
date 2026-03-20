import authService from "../services/authService.js";
import { createAuthToken } from "../helpers/authHelpers.js";
import User from "../models/User.js";
import RegisterClub from "../models/RegisterClub.js";

const register = async (req, res) => {
  const data = req.body;
  if (!data.name || !data.email || !data.password || !data.district)
    return res.status(422).send("Required Data missing....");
  if (data.password.length < 6)
    return res.status(400).send("Paasword lenght must be greater then 6");
  if (data.password !== data.confirmPassword)
    return res.status(400).send("Password not Match");

  try {
    const users = await authService.register(data);

    const token = createAuthToken(users);

    res.cookie("authToken", token, { httpOnly: true }); //(key,data)=> key is used to encrypt and dercrypt the data-token
    res.status(201).json({ ...users, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  const data = req.body;

  if (!data.email || !data.password)
    return res.status(422).send("Email or Password are missing....");
  if (data.password.length < 6)
    return res.status(400).send("Paasword lenght must be greater then 6");

  try {
    const existingUser = await authService.login(data);
    const token = createAuthToken(existingUser);
    res.cookie("authToken", token);
    res.status(200).json({
      ...existingUser,
      clubStatus: existingUser.club ? existingUser.club.status : "None",
      token,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getMe = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).populate("club").select("-password");
    if (!user) return res.status(404).send("User not found");
    console.log("User data sent to client:",user);
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      district: user.district,
      college: user.college,
      club: user.club,
      roles: user.roles,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { register, login, getMe };
