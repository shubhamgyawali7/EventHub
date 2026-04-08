import dotenv from 'dotenv';
import express from "express";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { getAllUsers, deleteUser } from "../controllers/adminController.js";
import { adminApproveClub, adminRejectClub } from "../controllers/clubController.js";
import { sendVerificationEmail } from "../utils/emailService.js";
import { sendClubVerificationEmail } from "../utils/testemailService.js";

import { Resend } from 'resend';

dotenv.config();

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

const resend = new Resend(process.env.RESEND_API_KEY);

router.get("/test-resend", async (req, res) => {
    try {
        console.log("🚀 Testing Resend Email...");
        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'EventHub <support@mail.aakashbhandari.info.np>',
            to: 'ffgyawali7@gmail.com',
            subject: 'Resend Test - EventHub',
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #4f46e5;">Email Service Test</h2>
                    <p>If you are reading this, <strong>Resend</strong> is working correctly in your EventHub backend!</p>
                    <p>Sent at: ${new Date().toLocaleString()}</p>
                </div>
            `,
        });

        if (error) {
            console.error("❌ Resend Error:", error);
            return res.status(400).json({ success: false, error });
        }

        console.log("✅ Email sent successfully:", data);
        res.status(200).json({ success: true, message: "Email sent!", data });
    } catch (error) {
        console.error("💥 Server Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
