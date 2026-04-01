import express from "express";
import { login, register, getMe } from "../controllers/authController.js";
import { submitClubRegistration } from "../controllers/clubController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
// import upload from "../middlewares/upload.js";

const router = express.Router();

// router.post('/forget-password',forgetPassword);
// router.post('/reset-password',resetPassword);

router.post("/register", register);
router.get("/me", auth, getMe);
router.post("/login", login);

router.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
