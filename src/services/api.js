import axios from 'axios';

// Base URL of your backend
const API = axios.create({ baseURL: 'http://localhost:5000/api/users' });

// Save user data
export const saveUserData = (userData) => API.post('/save', userData);

// Fetch user data by ID
export const fetchUserData = (userId) => API.get(`/${userId}`);
