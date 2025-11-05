import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const EditStudent = () => {
  const { id } = useParams(); // Get student ID from URL
  const navigate = useNavigate(); // Redirect after update

  const [student, setStudent] = useState({
    name: '',
    age: '',
    class: '',
    section: '',
  });

  // Fetch student details when component mounts
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };
    fetchStudent();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/students/${id}`, student);
      alert('Student updated successfully!');
      navigate('/'); // redirect back to list after update
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label>Age:</label>
        <br />
        <input
          type="number"
          name="age"
          value={student.age}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label>Class:</label>
        <br />
        <input
          type="text"
          name="class"
          value={student.class}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label>Section:</label>
        <br />
        <input
          type="text"
          name="section"
          value={student.section}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
