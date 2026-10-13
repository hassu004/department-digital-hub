const express = require("express");
const Resource = require("../models/Resource");

const {
  authenticateToken,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// GET ALL RESOURCES
// Students, Faculty and Admin can view
// ===============================
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find().sort({
      createdAt: -1
    });

    res.status(200).json(resources);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resources",
      error: error.message
    });
  }
});


// ===============================
// ADD RESOURCE
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
        category,
        link,
        uploadedBy
      } = req.body;

      const resource = new Resource({
        title,
        description,
        category,
        link,
        uploadedBy
      });

      await resource.save();

      res.status(201).json({
        message: "Resource added successfully",
        resource
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to add resource",
        error: error.message
      });
    }
  }
);


// ===============================
// EDIT RESOURCE
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
        category,
        link,
        uploadedBy
      } = req.body;

      const resource = await Resource.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          category,
          link,
          uploadedBy
        },
        {
          new: true,
          runValidators: true
        }
      );

      if (!resource) {
        return res.status(404).json({
          message: "Resource not found"
        });
      }

      res.status(200).json({
        message: "Resource updated successfully",
        resource
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to update resource",
        error: error.message
      });
    }
  }
);


// ===============================
// DELETE RESOURCE
// Faculty and Admin only
// ===============================
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("faculty", "admin"),
  async (req, res) => {
    try {
      const resource = await Resource.findByIdAndDelete(
        req.params.id
      );

      if (!resource) {
        return res.status(404).json({
          message: "Resource not found"
        });
      }

      res.status(200).json({
        message: "Resource deleted successfully"
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to delete resource",
        error: error.message
      });
    }
  }
);


module.exports = router;

