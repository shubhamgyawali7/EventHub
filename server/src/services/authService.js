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
    club: data.club,
    roles: data.roles,
    createdAt: data.createdAt,
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
  const userExist = await User.findOne({ email: data.email });
  if (!userExist) throw new Error("Invalid Email or Password...");

  const isPasswordMatch = bcrypt.compareSync(data.password, userExist.password);
  if (!isPasswordMatch) throw new Error("Invalid Email or Password...");

  return {
    id: userExist._id,
    name: userExist.name,
    email: userExist.email,
    address: userExist.address,
    district: userExist.district,
    college: userExist.college,
    club: userExist.club,
    roles: userExist.roles,
  };
};

export default { register, login };
