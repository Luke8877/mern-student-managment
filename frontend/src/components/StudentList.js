import React, { useState, useEffect } from 'react';
import api from '../api'; // import Axios instance
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]); // State to hold the list of students

  // Fetch students when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/students'); // GET request to backend
        setStudents(response.data); // Set the students in state
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  // Function to delete a student
  const handleDelete = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} – {student.class} ({student.section})
            <Link to={`/edit/${student._id}`} style={{ marginLeft: '10px' }}>
              Edit
            </Link>
            <button onClick={() => handleDelete(student._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
