import axios from 'axios';

// Create a centralized axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true, // This is crucial for sending cookies
    headers: {
        'Content-Type': 'application/json'
    }
});

// Response interceptor to handle 401 (Unauthorized) globally
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // If we get a 401/403, it means the cookie is invalid or missing
            // We can optionally redirect to login here, or let the component handle it
            // For now, we'll clear any user data from local storage to keep UI in sync
            localStorage.removeItem('user');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
