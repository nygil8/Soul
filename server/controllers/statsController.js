const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

exports.getDashboardStats = async (req, res) => {
    try {
        // 1. Total Sales (Revenue)
        const totalRevenue = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

        // 2. Total Orders
        const totalOrders = await Order.countDocuments();

        // 3. New Customers (Total Users)
        // ideally filter by creation date for "New", but for overview total is often used
        const totalCustomers = await User.countDocuments({ role: 'user' });

        // 4. Low Stock Count
        const lowStockCount = await Product.countDocuments({ stock: { $lt: 10 } });

        res.json({
            success: true,
            data: {
                revenue,
                totalOrders,
                totalCustomers,
                lowStockCount
            }
        });
    } catch (error) {
        console.error('Stats Error:', error);
        res.status(500).json({ message: 'Server error fetching stats' });
    }
};

exports.getSalesChart = async (req, res) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const sales = await Order.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    sales: { $sum: "$totalAmount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({ success: true, data: sales });
    } catch (error) {
        console.error('Chart Error:', error);
        res.status(500).json({ message: 'Server error fetching chart data' });
    }
};

exports.getCategoryStats = async (req, res) => {
    try {
        const stats = await Product.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        const formatted = stats.map(item => ({
            name: item._id || 'Uncategorized',
            value: item.count
        }));

        res.json({ success: true, data: formatted });
    } catch (error) {
        console.error('Category Stats Error:', error);
        res.status(500).json({ message: 'Server error fetching category stats' });
    }
};
