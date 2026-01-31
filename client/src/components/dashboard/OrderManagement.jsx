import React, { useState, useEffect } from 'react';
import { Eye, Trash2, Package, CheckCircle, Clock, Truck, X, Download } from 'lucide-react';
import api from '../../utils/api';
import './OrderManagement.css';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            // No manual token needed
            const res = await api.get('/orders');
            setOrders(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders', error);
            setLoading(false);
        }
    };

    const handleExportCSV = () => {
        const headers = ["Order ID", "Customer Name", "Customer Email", "Date", "Total Amount", "Status"];
        const rows = orders.map(order => [
            order._id,
            `${order.customer?.firstName || ''} ${order.customer?.lastName || ''}`.trim(),
            order.customer?.email || '',
            new Date(order.createdAt).toLocaleDateString(),
            order.orderDetails.totalAmount,
            order.status
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(','), ...rows.map(e => e.join(','))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "orders_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await api.put(`/orders/${id}/status`,
                { status: newStatus }
            );

            setOrders(orders.map(o => o._id === id ? res.data.data : o));
            if (selectedOrder && selectedOrder._id === id) {
                setSelectedOrder(res.data.data);
            }
        } catch (error) {
            console.error('Update failed', error);
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this order?')) return;
        try {
            await api.delete(`/orders/${id}`);
            setOrders(orders.filter(o => o._id !== id));
            if (selectedOrder && selectedOrder._id === id) {
                setSelectedOrder(null);
            }
        } catch (error) {
            console.error('Delete failed', error);
            alert('Failed to delete order');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'status-pending';
            case 'Processing': return 'status-processing';
            case 'Shipped': return 'status-shipped';
            case 'Delivered': return 'status-delivered';
            case 'Cancelled': return 'status-cancelled';
            default: return '';
        }
    };

    const filteredOrders = filter === 'All'
        ? orders
        : orders.filter(o => o.status === filter);

    if (loading) return <div>Loading orders...</div>;

    return (
        <div className="order-management">
            <div className="om-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <h2>Order Management</h2>
                    <button onClick={handleExportCSV} className="export-btn" style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '8px 16px', borderRadius: '8px', border: '1px solid #ccc',
                        background: 'white', cursor: 'pointer', fontSize: '0.9rem'
                    }}>
                        <Download size={16} /> Export CSV
                    </button>
                </div>
                <div className="filter-group">
                    {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                        <button
                            key={status}
                            className={`filter-btn ${filter === status ? 'active' : ''}`}
                            onClick={() => setFilter(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="orders-container">
                <div className="orders-list">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order._id} className={selectedOrder?._id === order._id ? 'selected-row' : ''}>
                                    <td>#{order._id.slice(-6)}</td>
                                    <td>{order.customer?.firstName || 'Unknown'} {order.customer?.lastName || 'Customer'}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>₹{order.orderDetails.totalAmount}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn view" onClick={() => setSelectedOrder(order)}>
                                            <Eye size={16} />
                                        </button>
                                        <button className="action-btn delete" onClick={() => handleDelete(order._id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedOrder && (
                    <div className="order-details-panel glass-effect">
                        <div className="panel-header">
                            <h3>Order Details</h3>
                            <button className="close-btn" onClick={() => setSelectedOrder(null)}><X size={20} /></button>
                        </div>

                        <div className="order-info-grid">
                            <div className="info-block">
                                <h4>Customer Info</h4>
                                <p><strong>Name:</strong> {selectedOrder.customer?.firstName} {selectedOrder.customer?.lastName}</p>
                                <p><strong>Email:</strong> {selectedOrder.customer?.email}</p>
                                <p><strong>Phone:</strong> {selectedOrder.customer?.phone}</p>
                            </div>
                            <div className="info-block">
                                <h4>Shipping Address</h4>
                                <p>{selectedOrder.address?.houseNumberStreet}</p>
                                <p>{selectedOrder.address?.townCity}, {selectedOrder.address?.state}</p>
                                <p>{selectedOrder.address?.pincode}</p>
                            </div>
                        </div>

                        <div className="order-items-list">
                            <h4>Items</h4>
                            {selectedOrder.orderDetails.items.map((item, idx) => (
                                <div key={idx} className="order-item">
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                            <div className="order-summary">
                                <div className="summary-row">
                                    <span>Subtotal:</span>
                                    <span>₹{selectedOrder.orderDetails.subtotal}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping:</span>
                                    <span>₹{selectedOrder.orderDetails.shipping}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total:</span>
                                    <span>₹{selectedOrder.orderDetails.totalAmount}</span>
                                </div>
                            </div>
                        </div>

                        <div className="status-control">
                            <h4>Update Status</h4>
                            <div className="status-buttons">
                                {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                                    <button
                                        key={status}
                                        className={`status-action-btn ${status.toLowerCase()}`}
                                        disabled={selectedOrder.status === status}
                                        onClick={() => handleStatusUpdate(selectedOrder._id, status)}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderManagement;
