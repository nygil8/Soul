import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; // Import our new utility

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            // Use api.post instead of axios.post
            // No need to handle cookies manually, browser/backend does it
            const res = await api.post('/auth/login', formData);

            // Check if user is admin
            if (res.data.user.role !== 'admin') {
                setError('Access denied. Admin privileges required.');
                return;
            }

            // DO NOT store token in localStorage anymore
            // localStorage.setItem('token', res.data.token); 

            // We still store user info for UI display (username, avatar), 
            // but this is NOT for authentication.
            // SECURITY: Explicitly filtering what we store to avoid PII in localStorage
            const userForStorage = {
                id: res.data.user.id,
                username: res.data.user.username,
                role: res.data.user.role,
                profilePhoto: res.data.user.profilePhoto
            };
            localStorage.setItem('user', JSON.stringify(userForStorage));

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card glass-effect">
                <div className="login-header">
                    <div className="logo-icon">EK</div>
                    <h2>Admin Login</h2>
                    <p>Enter your credentials to access the dashboard</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
