const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../server'); // Import server.js
const Student = require('../models/studentModel'); // Import the model

describe('Student Management System', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterEach(async () => {
    await Student.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  // Create student
  describe('POST /api/students', () => {
    it('should create a new student', async () => {
      const studentData = {
        name: 'John Doe',
        age: 21,
        class: 'Math',
        section: 'A',
      };
      const res = await request(app).post('/api/students').send(studentData);
      expect(res.status).to.equal(201);
      expect(res.body).to.include(studentData);
    });
  });

  // Retrieve all students
  describe('GET /api/students', () => {
    it('should retrieve all students', async () => {
      await Student.create({
        name: 'Jane Doe',
        age: 22,
        class: 'Physics',
        section: 'B',
      });
      const res = await request(app).get('/api/students');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(1);
      expect(res.body[0]).to.have.property('name', 'Jane Doe');
    });
  });

  // Retrieve one student
  describe('GET /api/students/:id', () => {
    it('should retrieve a single student by ID', async () => {
      const student = await Student.create({
        name: 'John Doe',
        age: 21,
        class: 'Math',
        section: 'A',
      });
      const res = await request(app).get(`/api/students/${student._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('name', 'John Doe');
    });
  });

  // Update student
  describe('PUT /api/students/:id', () => {
    it('should update a student by ID', async () => {
      const student = await Student.create({
        name: 'John Doe',
        age: 21,
        class: 'Math',
        section: 'A',
      });
      const updatedData = {
        name: 'Johnny Doe',
        age: 22,
        class: 'Math',
        section: 'B',
      };
      const res = await request(app)
        .put(`/api/students/${student._id}`)
        .send(updatedData);
      expect(res.status).to.equal(200);
      expect(res.body).to.include(updatedData);
    });
  });

  // Delete student
  describe('DELETE /api/students/:id', () => {
    it('should delete a student by ID', async () => {
      const student = await Student.create({
        name: 'Jane Doe',
        age: 22,
        class: 'Physics',
        section: 'B',
      });
      const res = await request(app).delete(`/api/students/${student._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        'message',
        'Student deleted successfully'
      );
    });
  });
});
