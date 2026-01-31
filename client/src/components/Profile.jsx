import React, { useState, useEffect } from 'react';
import { Camera, Save, Lock, User, Mail, Settings, Percent, Star, MessageSquare } from 'lucide-react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('details'); // details | password | admin
    const [message, setMessage] = useState({ type: '', text: '' });

    // Forms
    const [detailsForm, setDetailsForm] = useState({ username: '', email: '' });
    const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

    // Helper to get token REMOVED
    // const getToken = () => localStorage.getItem('token');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get('/auth/me');
            setUser(res.data.data);
            setDetailsForm({
                username: res.data.data.username,
                email: res.data.data.email
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile', error);
            setLoading(false);
        }
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('photo', file);

        try {
            setMessage({ type: 'info', text: 'Uploading photo...' });

            const res = await api.post('/auth/uploadphoto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUser(prev => ({ ...prev, profilePhoto: res.data.profilePhoto }));
            setMessage({ type: 'success', text: 'Profile photo updated!' });
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to upload photo.' });
        }
    };

    const handleUpdateDetails = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put('/auth/updatedetails', detailsForm);

            setUser(res.data.user);
            setMessage({ type: 'success', text: 'Details updated successfully!' });
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to update details.' });
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        // ... (password logic same as before) ...
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match.' });
            return;
        }

        try {
            await api.put('/auth/updatepassword', {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            });

            setMessage({ type: 'success', text: 'Password changed successfully!' });
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to change password.' });
        }
    };

    if (loading) return <div className="p-8">Loading profile...</div>;

    return (
        <div className="profile-container">
            <div className="profile-header-card glass-effect">
                <div className="profile-photo-wrapper">
                    <img
                        src={user?.profilePhoto || `https://ui-avatars.com/api/?name=${user?.username}&background=ffdab9&color=fff`}
                        alt="Profile"
                        className="profile-photo-lg"
                    />
                    <label htmlFor="photo-upload" className="photo-upload-btn">
                        <Camera size={18} />
                        <input
                            type="file"
                            id="photo-upload"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
                <div className="profile-info">
                    <h2>{user?.username}</h2>
                    <span className="role-badge">{user?.role}</span>
                    <p className="email-text">{user?.email}</p>
                </div>
            </div>

            {message.text && (
                <div className={`message-alert ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="profile-content glass-effect">
                <div className="tabs">
                    <button
                        className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('details')}
                    >
                        <User size={18} /> Edit Details
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
                        onClick={() => setActiveTab('password')}
                    >
                        <Lock size={18} /> Change Password
                    </button>
                    {user?.role === 'admin' && (
                        <button
                            className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
                            onClick={() => setActiveTab('admin')}
                        >
                            <Settings size={18} /> Admin Controls
                        </button>
                    )}
                </div>

                <div className="tab-content">
                    {activeTab === 'details' && (
                        <form onSubmit={handleUpdateDetails} className="profile-form">
                            <div className="form-group">
                                <label><User size={16} /> Username</label>
                                <input
                                    type="text"
                                    value={detailsForm.username}
                                    onChange={e => setDetailsForm({ ...detailsForm, username: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label><Mail size={16} /> Email</label>
                                <input
                                    type="email"
                                    value={detailsForm.email}
                                    onChange={e => setDetailsForm({ ...detailsForm, email: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="save-btn"><Save size={18} /> Save Changes</button>
                        </form>
                    )}

                    {activeTab === 'password' && (
                        <form onSubmit={handleUpdatePassword} className="profile-form">
                            <div className="form-group">
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.currentPassword}
                                    onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.newPassword}
                                    onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.confirmPassword}
                                    onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="save-btn"><Save size={18} /> Update Password</button>
                        </form>
                    )}

                    {activeTab === 'admin' && user?.role === 'admin' && (
                        <div className="admin-controls-grid">
                            <div className="control-card" onClick={() => navigate('/dashboard/products')}>
                                <div className="card-icon"><Percent size={24} color="#ef4444" /></div>
                                <div className="card-info">
                                    <h4>Discount Rules</h4>
                                    <p>Manage product pricing & discounts</p>
                                </div>
                            </div>
                            <div className="control-card" onClick={() => navigate('/dashboard/reviews')}>
                                <div className="card-icon"><MessageSquare size={24} color="#3b82f6" /></div>
                                <div className="card-info">
                                    <h4>Rating Moderation</h4>
                                    <p>View & hide user reviews</p>
                                </div>
                            </div>
                            <div className="control-card" onClick={() => navigate('/dashboard/products')}>
                                <div className="card-icon"><Star size={24} color="#fbbf24" /></div>
                                <div className="card-info">
                                    <h4>Popular Products</h4>
                                    <p>Manually set popular items</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;




