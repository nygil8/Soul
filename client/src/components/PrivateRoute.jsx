import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // const token = localStorage.getItem('token'); // REMOVED
    const user = JSON.parse(localStorage.getItem('user'));

    // We no longer check for token existence in localStorage
    // If the cookie is missing/invalid, API calls will fail with 401
    // and the api.js interceptor will redirect to login.
    // However, for better UX on page load, we can check if 'user' data exists
    // as a proxy for "is logged in", or verify with backend.

    // Simple check: if no user data in local storage, assume not logged in.
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user && user.role !== 'admin') {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
