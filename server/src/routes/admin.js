import dotenv from 'dotenv';
import express from "express";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { getAllUsers, deleteUser } from "../controllers/adminController.js";
import { adminApproveClub, adminRejectClub } from "../controllers/clubController.js";
import { sendVerificationEmail } from "../utils/emailService.js";



dotenv.config();

console.log('📧 Email Config:');
console.log('  Email User:', process.env.EMAIL_USER);
console.log('  Email Pass:', process.env.EMAIL_PASS ? '✓ Set' : '✗ Missing');
console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);
console.log('  Client URL:', process.env.FRONTEND_URL);


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

router.get("/test-verification-email", async (req, res) => {
    try {
        // 1. Define test data
        // Change this to your own email to see the result!
        const testEmail = 'shubhamgyawali2061@gmail.com';
        const testClubName = "Test Adventure Club";

        console.log("🧪 Starting Email Test...");

        // 2. Call the function
        const result = await sendVerificationEmail(testEmail, testClubName);

        // 3. Handle the response
        if (result.success) {
            return res.status(200).json({
                success: true,
                message: `Test email sent successfully to ${testEmail}`,
                messageId: result.messageId
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to send test email.",
                error: result.error
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


export default router;
