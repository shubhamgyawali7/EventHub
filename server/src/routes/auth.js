import express from "express";
import {
  login,
  register,
  getMe,
  updateProfile,
} from "../controllers/authController.js";
import auth from "../middlewares/auth.js";
import {
  uploadProfilePicture,
  handleMulterError,
} from "../middlewares/upload.js";

const router = express.Router();

router.post("/register", register);
router.get("/me", auth, getMe);
router.post("/login", login);
router.put(
  "/profile",
  [auth, uploadProfilePicture, handleMulterError],
  updateProfile,
);

router.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
