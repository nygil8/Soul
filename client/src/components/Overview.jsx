import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import {
    TrendingUp,
    Package,
    Users,
    CreditCard
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const Overview = () => {
    const [stats, setStats] = useState({
        revenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        lowStockCount: 0
    });
    const [salesData, setSalesData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // No need to get token or set headers manually

            // Fetch Overview Stats
            const statsRes = await api.get('/stats/summary');
            setStats(statsRes.data.data);

            // Fetch Sales Chart
            const chartRes = await api.get('/stats/sales-chart');
            setSalesData(chartRes.data.data);

            // Fetch Category Stats
            const catRes = await api.get('/stats/categories');
            setCategoryData(catRes.data.data.map((item, index) => ({
                ...item,
                fill: COLORS[index % COLORS.length]
            })));

            // Fetch Low Stock
            const lowStockRes = await api.get('/products/low-stock');
            setLowStockProducts(lowStockRes.data.data);

            // Fetch Recent Orders (using existing endpoint with limit)
            const ordersRes = await api.get('/orders');
            setRecentOrders(ordersRes.data.data.slice(0, 5));

            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data', error);
            setLoading(false);
        }
    };

    if (loading) return <div>Loading dashboard...</div>;
    return (
        <div>
            {/* KPI Cards */}
            {/* KPI Cards */}
            <div className="kpi-grid">
                <div className="kpi-card" style={{ background: 'var(--color-accent-cream)' }}>
                    <div className="kpi-header">
                        <span className="kpi-title">Total Sales</span>
                        <div className="kpi-icon" style={{ backgroundColor: 'var(--color-bg-light)', color: 'var(--color-primary)' }}><TrendingUp size={20} /></div>
                    </div>
                    <div className="kpi-value">${stats.revenue.toLocaleString()}</div>
                    <div className="kpi-trend trend-up">
                        <TrendingUp size={14} /> +12% from last week
                    </div>
                </div>

                <div className="kpi-card" style={{ background: 'var(--color-accent-cream)' }}>
                    <div className="kpi-header">
                        <span className="kpi-title">Total Orders</span>
                        <div className="kpi-icon" style={{ backgroundColor: 'var(--color-bg-light)', color: 'var(--color-primary)' }}><Package size={20} /></div>
                    </div>
                    <div className="kpi-value">{stats.totalOrders}</div>
                    <div className="kpi-trend trend-up">
                        <TrendingUp size={14} /> +5% from last week
                    </div>
                </div>

                <div className="kpi-card" style={{ background: 'var(--color-accent-cream)' }}>
                    <div className="kpi-header">
                        <span className="kpi-title">New Customers</span>
                        <div className="kpi-icon" style={{ backgroundColor: 'var(--color-bg-light)', color: 'var(--color-primary)' }}><Users size={20} /></div>
                    </div>
                    <div className="kpi-value">{stats.totalCustomers}</div>
                    <div className="kpi-trend trend-down">
                        <TrendingUp size={14} style={{ transform: 'scaleY(-1)' }} /> -2% from last week
                    </div>
                </div>

                <div className="kpi-card" style={{ background: 'var(--color-accent-cream)' }}>
                    <div className="kpi-header">
                        <span className="kpi-title">Low Stock Alerts</span>
                        <div className="kpi-icon" style={{ backgroundColor: '#FCE4EC', color: '#D81B60' }}><Package size={20} /></div>
                    </div>
                    <div className="kpi-value">{stats.lowStockCount}</div>
                    <div className="kpi-trend">
                        Items below 10 units
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="charts-grid">
                {/* Sales Overview */}
                <div className="chart-card">
                    <h3 className="card-title">Sales Overview</h3>
                    <div style={{ width: '100%', height: 300, minWidth: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#4A90E2" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} />
                                <RechartsTooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="sales" stroke="#4A90E2" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="chart-card">
                    <h3 className="card-title">Category Distribution</h3>
                    <div style={{ width: '100%', height: 300, minWidth: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <RechartsTooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                            {categoryData.map((entry, index) => (
                                <div key={index} style={{ display: 'flex', items: 'center', fontSize: '12px' }}>
                                    <span style={{ width: 10, height: 10, backgroundColor: entry.fill, borderRadius: '50%', marginRight: 5 }}></span>
                                    {entry.name} ({entry.value})
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Low Stock Alert Widget */}
            {lowStockProducts.length > 0 && (
                <div className="table-container header-margin">
                    <h3 className="card-title text-red">⚠️ Low Stock Alerts</h3>
                    <div className="low-stock-grid">
                        {lowStockProducts.map(product => (
                            <div key={product._id} className="low-stock-card">
                                <strong>{product.name}</strong>
                                <span className="stock-count">{product.stock} left</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Orders Table */}
            <div className="table-container">
                <h3 className="card-title">Recent Orders</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order._id}>
                                <td>#{order._id.slice(-6).toUpperCase()}</td>
                                <td>{order.user?.username || 'Guest'}</td>
                                <td>₹{order.totalAmount}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Overview;
