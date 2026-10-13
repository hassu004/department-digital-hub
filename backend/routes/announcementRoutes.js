const express = require("express");
const Announcement = require("../models/Announcement");

const {
  authenticateToken,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// GET ALL ANNOUNCEMENTS
// Everyone can view announcements
// ===============================
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({
      createdAt: -1
    });

    res.status(200).json(announcements);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch announcements",
      error: error.message
    });
  }
});


// ===============================
// ADD ANNOUNCEMENT
// Faculty and Admin only
// ===============================
router.post(
  "/",
  authenticateToken,
  authorizeRoles("faculty", "admin"),
  async (req, res) => {
    try {
      const {
        title,
        message,
        postedBy,
        priority
      } = req.body;

      const announcement = new Announcement({
        title,
        message,
        postedBy,
        priority
      });

      await announcement.save();

      res.status(201).json({
        message: "Announcement added successfully",
        announcement
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to add announcement",
        error: error.message
      });
    }
  }
);


// ===============================
// EDIT ANNOUNCEMENT
// Faculty and Admin only
// ===============================
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("faculty", "admin"),
  async (req, res) => {
    try {
      const {
        title,
        message,
        postedBy,
        priority
      } = req.body;

      const announcement =
        await Announcement.findByIdAndUpdate(
          req.params.id,
          {
            title,
            message,
            postedBy,
            priority
          },
          {
            new: true,
            runValidators: true
          }
        );

      if (!announcement) {
        return res.status(404).json({
          message: "Announcement not found"
        });
      }

      res.status(200).json({
        message: "Announcement updated successfully",
        announcement
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to update announcement",
        error: error.message
      });
    }
  }
);


// ===============================
// DELETE ANNOUNCEMENT
// Faculty and Admin only
// ===============================
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("faculty", "admin"),
  async (req, res) => {
    try {
      const announcement =
        await Announcement.findByIdAndDelete(
          req.params.id
        );

      if (!announcement) {
        return res.status(404).json({
          message: "Announcement not found"
        });
      }

      res.status(200).json({
        message: "Announcement deleted successfully"
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to delete announcement",
        error: error.message
      });
    }
  }
);


module.exports = router;

