import express from "express";
import { login, register, getMe } from "../controllers/authController.js";
import { adminApproveClub, submitClubRegistration, getPendingClubs } from "../controllers/clubController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
// import resetsPasswords from '../models/ResetPassword.js';

const router = express.Router();

// router.post('/forget-password',forgetPassword);

// router.post('/reset-password',resetPassword);

router.post('/register', register);

router.get("/me", auth, getMe);

router.post("/register-club", auth, submitClubRegistration);
router.get("/pending-clubs", [auth, roleBasedAuth("Admin")], getPendingClubs);
router.patch("/approve-club/:id", [auth, roleBasedAuth("Admin")], adminApproveClub);

router.post("/login", login);

router.post("/logout", (req, res) => {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Logged out successfully" });
});

// router.post("/logout", logout);

export default router;
