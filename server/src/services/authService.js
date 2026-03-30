import bcrypt from "bcryptjs";
import User from "../models/User.js";

const register = async (data) => {
  const userExist = await User.findOne({ email: data.email });
  if (userExist) throw new Error("Email already exist...");

  const hashPassword = bcrypt.hashSync(data.password);

  const createdUser = await User.create({
    name: data.name,
    email: data.email,
    password: hashPassword,
    address: data.address,
    district: data.district,
    college: data.college,
    roles:
      data.roles === "Student" || data.roles === "Club"
        ? [data.roles]
        : ["Student"],
  });

  return {
    id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    address: createdUser.address,
    district: createdUser.district,
    // password: createdUser.password,
    college: createdUser.college,
    club: createdUser.club,
    roles: createdUser.roles,
  };
};

const login = async (data) => {
  const userExist = await User.findOne({ email: data.email }).populate("club");
  if (!userExist) throw new Error("Invalid Email or Password...");

  const isPasswordMatch = bcrypt.compareSync(data.password, userExist.password);
  if (!isPasswordMatch) throw new Error("Invalid Email or Password...");

  const userObj = userExist.toObject(); // Convert Mongoose document to plain JS object

  console.log("User Club=>", userObj.club);
  return {
    id: userObj._id,
    name: userObj.name,
    email: userObj.email,
    address: userObj.address,
    district: userObj.district,
    college: userObj.college,
    club: userObj.club,
    roles: userObj.roles,
  };
};

const me = async (userId) => {
  const user = await User.findById(userId).populate("club").select("-password");
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    address: user.address,
    district: user.district,
    college: user.college,
    club: user.club,
    roles: user.roles,
    // token: user.token,
  };
};

export default { register, login, me };
