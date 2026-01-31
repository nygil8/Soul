import React, { useState, useEffect } from 'react';
import { Trash2, User, Mail, Calendar, Download } from 'lucide-react';
import api from '../../utils/api';
import './CustomerManagement.css';

const CustomerManagement = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await api.get('/auth/users');
            setCustomers(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching customers', error);
            setLoading(false);
        }
    };

    const handleExportCSV = () => {
        const headers = ["User ID", "Username", "Email", "Role", "Joined Date"];
        const rows = customers.map(customer => [
            customer._id,
            customer.username,
            customer.email,
            customer.role,
            new Date(customer.createdAt).toLocaleDateString()
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(','), ...rows.map(e => e.join(','))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "customers_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

        try {
            await api.delete(`/auth/users/${id}`);
            setCustomers(customers.filter(c => c._id !== id));
        } catch (error) {
            console.error('Delete failed', error);
            alert('Failed to delete user');
        }
    };

    if (loading) return <div>Loading customers...</div>;

    return (
        <div className="customer-management">
            <div className="cm-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <h2>Customer Management</h2>
                    <button onClick={handleExportCSV} className="export-btn" style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '8px 16px', borderRadius: '8px', border: '1px solid #ccc',
                        background: 'white', cursor: 'pointer', fontSize: '0.9rem'
                    }}>
                        <Download size={16} /> Export CSV
                    </button>
                </div>
                <div className="stats-badge">
                    Total Customers: {customers.length}
                </div>
            </div>

            <div className="customers-list-container glass-effect">
                <table className="customers-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer._id}>
                                <td>
                                    <div className="user-cell">
                                        <div className="user-avatar-small">
                                            <User size={16} />
                                        </div>
                                        <span>{customer.username}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="icon-text">
                                        <Mail size={14} /> {customer.email}
                                    </div>
                                </td>
                                <td>
                                    <span className={`role-pill ${customer.role}`}>
                                        {customer.role}
                                    </span>
                                </td>
                                <td>
                                    <div className="icon-text">
                                        <Calendar size={14} /> {new Date(customer.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td>
                                    <button className="action-btn delete" onClick={() => handleDelete(customer._id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {customers.length === 0 && (
                    <div className="empty-state">
                        <p>No registered customers found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerManagement;
