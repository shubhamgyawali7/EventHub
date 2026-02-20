import authService from "../services/authService.js";
import { createAuthToken } from "../helpers/authHelpers.js";

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
    res.cookie("authToken", token); //(name,token)=> cookie:{name=token}
    res.status(201).json({ ...existingUser, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { register, login };
