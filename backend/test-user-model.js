
require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./src/models/User");

async function testUserModel() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from .env");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      family: 4,
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Atlas connected successfully");

    const password = "TestPassword123!";

    // Create a temporary user in memory only.
    const user = new User({
      fullName: "Test Student",
      email: "test.student@example.com",
      passwordHash: password,
      role: "student",
      status: "active",
    });

    // Check the required fields and validation rules.
    await user.validate();
    console.log("User model validation passed: true");

    // Run the model's password-hashing hook without saving to MongoDB.
    await user.save({
      validateBeforeSave: false,
      timestamps: false,
    });

    const passwordMatches = await user.comparePassword(password);

    console.log("Password hashing test passed:", passwordMatches);
    console.log("Test user saved to MongoDB: false");
  } catch (error) {
    console.error("Test failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

testUserModel();
