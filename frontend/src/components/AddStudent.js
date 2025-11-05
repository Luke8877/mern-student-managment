import React, { useState } from 'react';
import api from '../api'; // axios instance

const AddStudent = () => {
  // --- form state ---
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [classRoom, setClassRoom] = useState('');
  const [section, setSection] = useState('');

  // --- handle form submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newStudent = { name, age, class: classRoom, section };
      await api.post('/students', newStudent);
      alert('Student added successfully!');
      // clear inputs
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
    <div style={{ padding: '20px' }}>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Age:</label>
        <br />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Class:</label>
        <br />
        <input
          type="text"
          value={classRoom}
          onChange={(e) => setClassRoom(e.target.value)}
          required
        />
        <br />
        <br />

        <label>Section:</label>
        <br />
        <input
          type="text"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          required
        />
        <br />
        <br />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
