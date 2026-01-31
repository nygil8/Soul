import React, { useState, useEffect } from 'react';
import { Trash2, Eye, EyeOff, Star, MessageSquare } from 'lucide-react';
import api from '../../utils/api';
import './ReviewManagement.css';

const ReviewManagement = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await api.get('/reviews');
            setReviews(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reviews', error);
            setLoading(false);
        }
    };

    const toggleVisibility = async (id, currentStatus) => {
        try {
            const res = await api.put(`/reviews/${id}/visibility`, {});
            setReviews(reviews.map(r => r._id === id ? { ...r, isHidden: res.data.isHidden } : r));
        } catch (error) {
            console.error('Failed to toggle visibility', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure? This action cannot be undone.')) return;
        try {
            await api.delete(`/reviews/${id}`);
            setReviews(reviews.filter(r => r._id !== id));
        } catch (error) {
            console.error('Delete failed', error);
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < rating ? "#fbbf24" : "none"} color={i < rating ? "#fbbf24" : "#94a3b8"} />
        ));
    };

    if (loading) return <div>Loading reviews...</div>;

    return (
        <div className="review-management">
            <div className="rm-header">
                <h2>Review Management</h2>
                <div className="stats-badge">
                    Total Reviews: {reviews.length}
                </div>
            </div>

            <div className="reviews-list-container glass-effect">
                {reviews.length === 0 ? (
                    <div className="empty-state">
                        <MessageSquare size={48} />
                        <p>No reviews found yet.</p>
                    </div>
                ) : (
                    <table className="reviews-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>User</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map(review => (
                                <tr key={review._id} className={review.isHidden ? 'review-hidden' : ''}>
                                    <td>{review.product?.name || 'Unknown Product'}</td>
                                    <td>{review.user?.username || 'Anonymous'}</td>
                                    <td>
                                        <div className="star-rating">
                                            {renderStars(review.rating)}
                                        </div>
                                    </td>
                                    <td className="comment-cell" title={review.comment}>
                                        {review.comment.length > 50 ? review.comment.substring(0, 50) + '...' : review.comment}
                                    </td>
                                    <td>
                                        <span className={`status-pill ${review.isHidden ? 'hidden' : 'visible'}`}>
                                            {review.isHidden ? 'Hidden' : 'Visible'}
                                        </span>
                                    </td>
                                    <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            className="action-btn view"
                                            onClick={() => toggleVisibility(review._id, review.isHidden)}
                                            title={review.isHidden ? "Unhide Review" : "Hide Review"}
                                        >
                                            {review.isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                        <button className="action-btn delete" onClick={() => handleDelete(review._id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ReviewManagement;
