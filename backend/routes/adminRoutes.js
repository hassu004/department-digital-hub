const express = require("express");
const User = require("../models/User");

const {
  authenticateToken,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// GET ALL USERS (ADMIN ONLY)
// ===============================
router.get(
  "/users",
  authenticateToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

      res.status(200).json(users);

    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch users",
        error: error.message
      });
    }
  }
);


// ===============================
// CHANGE USER ROLE (ADMIN ONLY)
// ===============================
router.put(
  "/users/:id/role",
  authenticateToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { role } = req.body;

      if (
        !["student", "faculty", "admin"].includes(role)
      ) {
        return res.status(400).json({
          message: "Invalid role"
        });
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.status(200).json({
        message: "User role updated successfully",
        user
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to update role",
        error: error.message
      });
    }
  }
);

module.exports = router;
