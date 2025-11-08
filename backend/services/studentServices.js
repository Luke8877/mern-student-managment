const Student = require('../models/studentModel');

// Fetch all students
exports.getAllStudents = async () => {
  return await Student.find();
};

// Fetch a single student
exports.getStudentById = async (id) => {
  return await Student.findById(id);
};

// Create a new student
exports.createStudent = async (data) => {
  const newStudent = new Student(data);
  return await newStudent.save();
};

// Update a student
exports.updateStudent = async (id, data) => {
  return await Student.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete a student
exports.deleteStudent = async (id) => {
  return await Student.findByIdAndDelete(id);
};
