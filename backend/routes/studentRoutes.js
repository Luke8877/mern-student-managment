// Import Express and create a router
const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// Define routes and map them to controller actions

// @route   GET /api/students
// @desc    Get all students
router.get('/', getAllStudents);

// @route   GET /api/students/:id
// @desc    Get a single student by ID
router.get('/:id', getStudentById);

// @route   POST /api/students
// @desc    Create a new student
router.post('/', createStudent);

// @route   PUT /api/students/:id
// @desc    Update an existing student
router.put('/:id', updateStudent);

// @route   DELETE /api/students/:id
// @desc    Delete a student by ID
router.delete('/:id', deleteStudent);

// Export the router to be used in server.js
module.exports = router;
