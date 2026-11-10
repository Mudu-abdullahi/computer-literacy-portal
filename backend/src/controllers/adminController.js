
const mongoose = require("mongoose");
const User = require("../models/User");

// ==========================================
// 1. GET ALL REGISTERED STUDENTS
// ==========================================

exports.getStudents = async (req, res) => {
  try {
    const { status } = req.query;

    const allowedStatuses = ["pending", "active", "inactive"];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student status.",
      });
    }

    const filter = { role: "student" };

    if (status) {
      filter.status = status;
    }

    const students = await User.find(filter)
      .select("fullName email role status createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: students.length,
      students,
    });

  } catch (error) {
    console.error("Get students error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve students.",
    });
  }
};


// ==========================================
// 2. APPROVE STUDENT ACCOUNT
// ==========================================

exports.approveStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID.",
      });
    }

    const student = await User.findOne({
      _id: id,
      role: "student",
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    student.status = "active";
    await student.save();

    return res.status(200).json({
      success: true,
      message: "Student account approved successfully.",
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        role: student.role,
        status: student.status,
      },
    });

  } catch (error) {
    console.error("Approve student error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to approve student.",
    });
  }
};


// ==========================================
// 3. DEACTIVATE STUDENT ACCOUNT
// ==========================================

exports.deactivateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID.",
      });
    }

    const student = await User.findOne({
      _id: id,
      role: "student",
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    student.status = "inactive";
    await student.save();

    return res.status(200).json({
      success: true,
      message: "Student account deactivated successfully.",
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        role: student.role,
        status: student.status,
      },
    });

  } catch (error) {
    console.error("Deactivate student error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to deactivate student.",
    });
  }
};
