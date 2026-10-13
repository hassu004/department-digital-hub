
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


// ===============================
// REGISTER
// ===============================
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // New users are students by default
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: "student"
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
});


// ===============================
// LOGIN
// ===============================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Send response
        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
});


module.exports = router;
// TEMPORARY: Create Admin account
router.post("/create-admin", async (req, res) => {
    try {
        const existingAdmin = await User.findOne({
            email: "admin@department.com"
        });

        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(
            "Admin@123",
            10
        );

        const admin = new User({
            name: "Department Admin",
            email: "admin@department.com",
            password: hashedPassword,
            role: "admin"
        });

        await admin.save();

        res.status(201).json({
            message: "Admin created successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create admin",
            error: error.message
        });
    }
});
