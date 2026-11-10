
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");

async function createAdmin() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Check required environment variables
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("Admin credentials are missing.");
    }

    if (ADMIN_PASSWORD.length < 8 || ADMIN_PASSWORD.length > 128) {
      throw new Error("Password must be between 8 and 128 characters.");
    }

    const email = ADMIN_EMAIL.trim().toLowerCase();

    // Prevent creation of multiple administrators
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("An administrator account already exists.");
      return;
    }

    // Do not accidentally overwrite an existing student account
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("This email already belongs to another account.");
    }

    // Create administrator
    const admin = new User({
      fullName: ADMIN_NAME.trim(),
      email,
      passwordHash: ADMIN_PASSWORD,
      role: "admin",
      status: "active",
    });

    // Password is automatically hashed by User.js
    await admin.save();

    console.log("Administrator created successfully!");
    console.log("Name:", admin.fullName);
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
    console.log("Status:", admin.status);

  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;

  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
