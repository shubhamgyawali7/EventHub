import express from "express";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { getAllUsers, deleteUser } from "../controllers/adminController.js";
import { adminApproveClub, adminRejectClub } from "../controllers/clubController.js";
import { Resend } from 'resend';

const router = express.Router();

/**
 * @desc Get all users
 * @route GET /api/admin/users
 * @access Private (Admin only)
 */
router.get("/users", [auth, roleBasedAuth("Admin")], getAllUsers);

/**
 * @desc Delete a user
 * @route DELETE /api/admin/users/:id
 * @access Private (Admin only)
 */
router.delete("/users/:id", [auth, roleBasedAuth("Admin")], deleteUser);

/**
 * @desc Club Approval System
 * @route PUT /api/admin/clubs/approve/:id
 */
router.put("/clubs/approve/:id", [auth, roleBasedAuth("Admin")], adminApproveClub);
router.put("/clubs/reject/:id", [auth, roleBasedAuth("Admin")], adminRejectClub);

router.get("/test-email", async (req, res) => {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // IMPORTANT
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        family: 4,
    });

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // send to yourself
            subject: "Test from EventHub",
            text: "If you see this, email works now!",
        });
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

const resend = new Resend(process.env.RESEND_API_KEY);

router.get("/resend/test-email", async (req, res) => {
    try {
        await resend.emails.send({
            from: 'EventHub <onboarding@resend.dev>',
            to: 'shubhamgyawali11@gmail.com',
            subject: 'Test from EventHub',
            html: '<p>If you see this, email works!</p>',
        });
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

export default router;
