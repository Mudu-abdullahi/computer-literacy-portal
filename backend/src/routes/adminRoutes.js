
const express = require("express");

const {
  getStudents,
  approveStudent,
  deactivateStudent,
} = require("../controllers/adminController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// All administrator routes require authentication
// and administrator permissions.
router.use(protect, authorize("admin"));

// Get all students
// GET /api/admin/students
router.get("/students", getStudents);

// Approve a student
// PATCH /api/admin/students/:id/approve
router.patch("/students/:id/approve", approveStudent);

// Deactivate a student
// PATCH /api/admin/students/:id/deactivate
router.patch("/students/:id/deactivate", deactivateStudent);

module.exports = router;
