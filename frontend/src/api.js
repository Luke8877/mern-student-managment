import axios from 'axios';

// Create an Axios instance with the backend API base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend URL
});

export default api;
