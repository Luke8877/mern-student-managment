import React, { useState } from 'react';
import api from '../api';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [classRoom, setClassRoom] = useState('');
  const [section, setSection] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newStudent = { name, age, class: classRoom, section };
      await api.post('/students', newStudent);
      alert('Student added successfully!');
      setName('');
      setAge('');
      setClassRoom('');
      setSection('');
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student');
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Student</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px' }}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={age}
            onChange={(e) => setAge(e.target.value)}
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
            value={classRoom}
            onChange={(e) => setClassRoom(e.target.value)}
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
            value={section}
            onChange={(e) => setSection(e.target.value)}
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
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
