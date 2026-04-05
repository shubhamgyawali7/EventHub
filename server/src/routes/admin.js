import express from "express";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { getAllUsers, deleteUser } from "../controllers/adminController.js";

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

export default router;
