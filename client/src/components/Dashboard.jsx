import React from 'react';
import api from '../utils/api';
import {
    ShoppingBag,
    LayoutDashboard,
    Users,
    Package,
    Settings,
    Bell,
    MessageSquare,
} from 'lucide-react';
import './Dashboard.css';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine active tab based on current path
    const getActiveTab = () => {
        const path = location.pathname.split('/')[2];
        if (!path) return 'Overview';
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    const activeTab = getActiveTab();

    const handleLogout = async () => {
        try {
            // Optional: Call backend to clear cookie explicitly (if endpoint exists)
            // await api.post('/auth/logout'); 

            // For now, just clear local user data and redirect
            // Cookie is managed by browser/backend
            // If we have a backend logout route, we should use it to clear the cookie on server/browser side effectively
            // Let's assume /auth/logout clears content
            await api.get('/auth/logout');
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    const navigateTo = (path) => {
        navigate(`/dashboard${path}`);
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo-container">
                    <div className="logo-icon">EK</div>
                    <span className="brand-name">E-KID</span>
                </div>

                <ul className="nav-links">
                    <li className={`nav-item ${activeTab === 'Overview' ? 'active' : ''}`} onClick={() => navigateTo('/')}>
                        <LayoutDashboard className="nav-icon" />
                        <span>Overview</span>
                    </li>
                    <li className={`nav-item ${activeTab === 'Orders' ? 'active' : ''}`} onClick={() => navigateTo('/orders')}>
                        <ShoppingBag className="nav-icon" />
                        <span>Orders</span>
                    </li>
                    <li className={`nav-item ${activeTab === 'Products' ? 'active' : ''}`} onClick={() => navigateTo('/products')}>
                        <Package className="nav-icon" />
                        <span>Products</span>
                    </li>
                    <li className={`nav-item ${activeTab === 'Customers' ? 'active' : ''}`} onClick={() => navigateTo('/customers')}>
                        <Users className="nav-icon" />
                        <span>Customers</span>
                    </li>
                    <li className={`nav-item ${activeTab === 'Reviews' ? 'active' : ''}`} onClick={() => navigateTo('/reviews')}>
                        <MessageSquare className="nav-icon" />
                        <span>Reviews</span>
                    </li>
                    <li className={`nav-item ${activeTab === 'Profile' ? 'active' : ''}`} onClick={() => navigateTo('/profile')}>
                        <Settings className="nav-icon" />
                        <span>Settings</span>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="header">
                    <div className="search-bar">
                        <h1 className="page-title">{activeTab === 'Overview' ? 'Dashboard' : activeTab}</h1>
                    </div>
                    <div className="user-profile">
                        <div className="icon-btn"><Bell size={20} color="#666" /></div>
                        <img
                            src={JSON.parse(localStorage.getItem('user'))?.profilePhoto || "https://ui-avatars.com/api/?name=Admin+User&background=ffdab9&color=fff"}
                            alt="User"
                            className="avatar"
                            onClick={() => navigateTo('/profile')}
                            style={{ cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '0.9rem', fontWeight: '500', marginRight: '10px' }}>
                            {JSON.parse(localStorage.getItem('user'))?.username || 'Admin'}
                        </span>
                        <button onClick={handleLogout} style={{ padding: '4px 12px', fontSize: '0.8rem', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
                    </div>
                </header>

                <Outlet />

            </main>
        </div>
    );
};

export default Dashboard;
