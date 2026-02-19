import express from "express";
import { login, register } from "../controllers/authController.js";
// import resetsPasswords from '../models/ResetPassword.js';

const router = express.Router();

// router.post('/forget-password',forgetPassword);

// /**
//  * POST
//  * api/auth/reset-password/?token=<forget_password req.body.token>
//  * Reset Paasword
//  */
// router.post('/reset-password',resetPassword);

// /**
//  * POST
//  * api/auth/register
//  * Register Users
//  */
router.post('/register',register);

/**
 * POST
 * api/auth/login
 * Login Users
 */
router.post("/login", login);

/**
 * POST
 * api/auth/logout
 * Logout Users
 */
// router.post("/logout", logout);

export default router;
