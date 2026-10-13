const express = require("express");
const Event = require("../models/Event");

const {
  authenticateToken,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// GET ALL EVENTS
// Everyone can view events
// ===============================
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({
      date: 1
    });

    res.status(200).json(events);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch events",
      error: error.message
    });
  }
});


// ===============================
// ADD EVENT
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
        description,
        date,
        venue,
        organizedBy
      } = req.body;

      const event = new Event({
        title,
        description,
        date,
        venue,
        organizedBy
      });

      await event.save();

      res.status(201).json({
        message: "Event added successfully",
        event
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to add event",
        error: error.message
      });
    }
  }
);


// ===============================
// EDIT EVENT
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
        description,
        date,
        venue,
        organizedBy
      } = req.body;

      const event = await Event.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          date,
          venue,
          organizedBy
        },
        {
          new: true,
          runValidators: true
        }
      );

      if (!event) {
        return res.status(404).json({
          message: "Event not found"
        });
      }

      res.status(200).json({
        message: "Event updated successfully",
        event
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to update event",
        error: error.message
      });
    }
  }
);


// ===============================
// DELETE EVENT
// Faculty and Admin only
// ===============================
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("faculty", "admin"),
  async (req, res) => {
    try {
      const event = await Event.findByIdAndDelete(
        req.params.id
      );

      if (!event) {
        return res.status(404).json({
          message: "Event not found"
        });
      }

      res.status(200).json({
        message: "Event deleted successfully"
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to delete event",
        error: error.message
      });
    }
  }
);


module.exports = router;

