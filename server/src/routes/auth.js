import express from "express";
import { login, register } from "../controllers/authController.js";
import { adminApproveClub, submitClubRegistration } from "../controllers/clubController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
// import resetsPasswords from '../models/ResetPassword.js';

const router = express.Router();

// router.post('/forget-password',forgetPassword);

// router.post('/reset-password',resetPassword);

router.post('/register',register);

router.post("/register-club", auth, submitClubRegistration);
router.patch("/approve-club/:id",[auth, roleBasedAuth("Admin")], adminApproveClub);

router.post("/login", login);

// router.post("/logout", logout);

export default router;
