
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    const existingAdmin = await User.findOne({
      email: "admin@department.com"
    });

    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      existingAdmin.role = "admin";

      await existingAdmin.save();

      console.log("Admin account updated successfully!");
      console.log("Email: admin@department.com");
      console.log("Password: Admin@123");

      process.exit();
    }

    const admin = new User({
      name: "Department Admin",
      email: "admin@department.com",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();

    console.log("Admin created successfully!");
    console.log("Email: admin@department.com");
    console.log("Password: Admin@123");

    process.exit();

  } catch (error) {
    console.error("Failed:", error.message);
    process.exit(1);
  }
}

createAdmin();
