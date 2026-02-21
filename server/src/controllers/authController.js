// src/controllers/authController.js
import authService from "../services/authService.js";
import { createAuthToken } from "../helpers/authHelpers.js";

const register = async (req, res) => {
  const data = req.body;

  // ✅ Validation with JSON responses
  if (!data.name || !data.email || !data.password || !data.district) {
    return res.status(422).json({ message: "Required data is missing." });
  }
  if (data.password.length < 6) {
    return res.status(400).json({ message: "Password length must be greater than 6." });
  }
  if (data.password !== data.confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const users = await authService.register(data);
    const token = createAuthToken(users);

    // ✅ Set cookie securely
    res.cookie("authToken", token, { httpOnly: true });

    // ✅ Return user + token in JSON
    res.status(201).json({ ...users, token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const data = req.body;

  // ✅ Validation with JSON responses
  if (!data.email || !data.password) {
    return res.status(422).json({ message: "Email or password is missing." });
  }
  if (data.password.length < 6) {
    return res.status(400).json({ message: "Password length must be greater than 6." });
  }

  try {
    const existingUser = await authService.login(data);

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = createAuthToken(existingUser);

    res.cookie("authToken", token, { httpOnly: true });
    return res.status(200).json({ ...existingUser, token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};

export { register, login };
