import React, { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px',
      }}
    >
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Student List</h2>

      {/* Add Student Button */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Link
          to="/add"
          style={{
            display: 'inline-block',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            fontWeight: '500',
          }}
        >
          + Add Student
        </Link>
      </div>

      <table
        style={{
          borderCollapse: 'collapse',
          width: '80%',
          maxWidth: '800px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <thead style={{ backgroundColor: '#333', color: '#fff' }}>
          <tr>
            <th style={{ padding: '12px' }}>Name</th>
            <th style={{ padding: '12px' }}>Class</th>
            <th style={{ padding: '12px' }}>Section</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr
                key={student._id}
                style={{
                  backgroundColor: index % 2 === 0 ? '#fff' : '#f2f2f2',
                  textAlign: 'center',
                }}
              >
                <td style={{ padding: '10px' }}>{student.name}</td>
                <td style={{ padding: '10px' }}>{student.class}</td>
                <td style={{ padding: '10px' }}>{student.section}</td>
                <td style={{ padding: '10px' }}>
                  <Link
                    to={`/edit/${student._id}`}
                    style={{
                      marginRight: '10px',
                      color: '#007bff',
                      textDecoration: 'none',
                    }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(student._id)}
                    style={{
                      backgroundColor: '#d9534f',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ padding: '20px', textAlign: 'center' }}>
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
