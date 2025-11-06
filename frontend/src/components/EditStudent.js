import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: '',
    age: '',
    class: '',
    section: '',
  });

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

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/students/${id}`, student);
      alert('Student updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        paddingTop: '60px',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '30px 40px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Student</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px' }}>Name:</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '15px',
            }}
          />

          <label style={{ marginBottom: '5px' }}>Age:</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
            required
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '15px',
            }}
          />

          <label style={{ marginBottom: '5px' }}>Class:</label>
          <input
            type="text"
            name="class"
            value={student.class}
            onChange={handleChange}
            required
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '15px',
            }}
          />

          <label style={{ marginBottom: '5px' }}>Section:</label>
          <input
            type="text"
            name="section"
            value={student.section}
            onChange={handleChange}
            required
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '20px',
            }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            Update Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
