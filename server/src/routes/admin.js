import express from "express";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { getAllUsers, deleteUser } from "../controllers/adminController.js";
import { adminApproveClub, adminRejectClub } from "../controllers/clubController.js";

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

export default router;
