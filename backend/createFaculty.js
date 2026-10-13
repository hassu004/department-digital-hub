
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function createFaculty() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const hashedPassword = await bcrypt.hash(
      "Faculty@123",
      10
    );

    const existingFaculty = await User.findOne({
      email: "faculty@department.com"
    });

    if (existingFaculty) {
      existingFaculty.password = hashedPassword;
      existingFaculty.role = "faculty";

      await existingFaculty.save();

      console.log("Faculty account updated successfully!");
      console.log("Email: faculty@department.com");
      console.log("Password: Faculty@123");

      process.exit();
    }

    const faculty = new User({
      name: "Department Faculty",
      email: "faculty@department.com",
      password: hashedPassword,
      role: "faculty"
    });

    await faculty.save();

    console.log("Faculty created successfully!");
    console.log("Email: faculty@department.com");
    console.log("Password: Faculty@123");

    process.exit();

  } catch (error) {
    console.error("Failed:", error.message);
    process.exit(1);
  }
}

createFaculty();
