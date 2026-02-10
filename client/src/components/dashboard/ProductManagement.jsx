import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Upload, Eye, Star, Percent } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import './ProductManagement.css';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [viewingProduct, setViewingProduct] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: '',
        gender: 'Unisex',
        ageType: '',
        discount: {
            type: 'percentage',
            value: 0,
            startDate: '',
            endDate: '',
            isActive: false
        },
        isPopular: false
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDiscountChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            discount: {
                ...prev.discount,
                [name]: type === 'checkbox' ? checked : value
            }
        }));
    };

    const togglePopularity = async (id, currentStatus) => {
        try {
            await api.put(`/products/toggle-popularity/${id}`, {});
            setProducts(products.map(p => p._id === id ? { ...p, isPopular: !p.isPopular } : p));
        } catch (error) {
            console.error('Failed to toggle popularity', error);
            alert('Failed to update popularity');
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('image', file);

        try {
            setUploading(true);
            const res = await api.post('/upload', uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFormData(prev => ({ ...prev, image: res.data.url }));
            setUploading(false);
        } catch (error) {
            console.error('Upload failed', error);
            alert('Image upload failed');
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingProduct) {
                // Update
                const res = await api.put(`/products/${editingProduct._id}`, formData);
                setProducts(products.map(p => p._id === editingProduct._id ? res.data.data : p));
            } else {
                // Create
                const res = await api.post('/products', formData);
                setProducts([res.data.data, ...products]);
                toast.success('Product created successfully');
            }
            closeModal();
        } catch (error) {
            console.error('Operation failed', error);
            const message = error.response?.data?.message || 'Failed to save product';
            toast.error(message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter(p => p._id !== id));
            toast.success('Product deleted');
        } catch (error) {
            console.error('Delete failed', error);
            toast.error('Failed to delete product');
        }
    };

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                stock: product.stock,
                image: product.image,
                gender: product.gender || 'Unisex',
                ageType: product.ageType || '',
                discount: product.discount || {
                    type: 'percentage',
                    value: 0,
                    startDate: '',
                    endDate: '',
                    isActive: false
                },
                isPopular: product.isPopular || false
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                stock: '',
                image: '',
                gender: 'Unisex',
                ageType: '',
                discount: {
                    type: 'percentage',
                    value: 0,
                    startDate: '',
                    endDate: '',
                    isActive: false
                },
                isPopular: false
            });
        }
        setShowModal(true);
    };

    const openViewModal = (product) => {
        setViewingProduct(product);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        setViewingProduct(null);
        setFormData({ name: '', description: '', price: '', category: '', stock: '', image: '', gender: 'Unisex', ageType: '' });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="product-management">
            <div className="pm-header">
                <h2>Product Management</h2>
                <button className="add-btn" onClick={() => openModal()}>
                    <Plus size={18} /> Add Product
                </button>
            </div>

            <div className="product-list">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Target</th>
                            <th>Popular</th>
                            <th>Discount</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="product-thumb" />
                                    ) : (
                                        <div className="product-thumb-placeholder">No Image</div>
                                    )}
                                </td>
                                <td>{product.name}</td>
                                <td>₹{product.price}</td>
                                <td>{product.category}</td>

                                <td>{product.gender} - {product.ageType}</td>
                                <td>
                                    <button
                                        className={`icon-btn ${product.isPopular ? 'star-active' : 'star-inactive'}`}
                                        onClick={() => togglePopularity(product._id, product.isPopular)}
                                    >
                                        <Star size={18} fill={product.isPopular ? "#fbbf24" : "none"} />
                                    </button>
                                </td>
                                <td>
                                    {product.discount?.isActive ? (
                                        <span className="discount-badge">
                                            {product.discount.value}{product.discount.type === 'percentage' ? '%' : '₹'} Off
                                        </span>
                                    ) : (
                                        <span className="no-discount">-</span>
                                    )}
                                </td>
                                <td>{product.stock}</td>
                                <td>
                                    <button className="action-btn view" onClick={() => openViewModal(product)}>
                                        <Eye size={16} />
                                    </button>
                                    <button className="action-btn edit" onClick={() => openModal(product)}>
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="action-btn delete" onClick={() => handleDelete(product._id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content glass-effect">
                        <div className="modal-header">
                            <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                            <button className="close-btn" onClick={closeModal}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="product-form">
                            <div className="form-group">
                                <label>Product Name</label>
                                <input name="name" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input name="category" value={formData.category} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Stock</label>
                                    <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select name="gender" value={formData.gender} onChange={handleInputChange}>
                                            <option value="Unisex">Unisex</option>
                                            <option value="Boys">Boys</option>
                                            <option value="Girls">Girls</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Age Type</label>
                                        <select name="ageType" value={formData.ageType} onChange={handleInputChange} required>
                                            <option value="">Select Age Group</option>
                                            <option value="0-2 Yrs">0-2 Yrs</option>
                                            <option value="3-6 Yrs">3-6 Yrs</option>
                                            <option value="7-12 Yrs">7-12 Yrs</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-section-divider">
                                <h4>Discount Configuration</h4>
                            </div>

                            <div className="form-row">
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            checked={formData.discount.isActive}
                                            onChange={handleDiscountChange}
                                        />
                                        Enable Discount
                                    </label>
                                </div>
                            </div>

                            {formData.discount.isActive && (
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Discount Type</label>
                                        <select name="type" value={formData.discount.type} onChange={handleDiscountChange}>
                                            <option value="percentage">Percentage (%)</option>
                                            <option value="fixed">Fixed Amount (₹)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Value</label>
                                        <input
                                            type="number"
                                            name="value"
                                            value={formData.discount.value}
                                            onChange={handleDiscountChange}
                                            min="0"
                                        />
                                    </div>
                                </div>
                            )}

                            {formData.discount.isActive && (
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Start Date</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.discount.startDate ? new Date(formData.discount.startDate).toISOString().split('T')[0] : ''}
                                            onChange={handleDiscountChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>End Date</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.discount.endDate ? new Date(formData.discount.endDate).toISOString().split('T')[0] : ''}
                                            onChange={handleDiscountChange}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="form-group">
                                <label>Product Image</label>
                                <div className="image-upload-container">
                                    {formData.image && <img src={formData.image} alt="Preview" className="image-preview" />}
                                    <label className="upload-btn-label">
                                        <Upload size={18} /> {uploading ? 'Uploading...' : 'Upload Image'}
                                        <input type="file" onChange={handleImageUpload} accept="image/*" disabled={uploading} hidden />
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="submit-btn" disabled={uploading}>
                                {editingProduct ? 'Update Product' : 'Create Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {viewingProduct && (
                <div className="modal-overlay">
                    <div className="modal-content glass-effect">
                        <div className="modal-header">
                            <h3>Product Details</h3>
                            <button className="close-btn" onClick={closeModal}><X size={20} /></button>
                        </div>
                        <div className="product-details-view">
                            <div className="details-image-container">
                                {viewingProduct.image ? (
                                    <img src={viewingProduct.image} alt={viewingProduct.name} className="details-image" />
                                ) : (
                                    <div className="details-image-placeholder">No Image Available</div>
                                )}
                            </div>
                            <div className="details-info">
                                <h4>{viewingProduct.name}</h4>
                                <div className="tags-row">
                                    <span className="category-pill">{viewingProduct.category}</span>
                                    <span className="category-pill">{viewingProduct.gender}</span>
                                    <span className="category-pill">{viewingProduct.ageType}</span>
                                </div>
                                <p className="price-tag">₹{viewingProduct.price}</p>
                                <p className="description-text">{viewingProduct.description}</p>
                                <div className="stock-info">
                                    <strong>Stock:</strong> {viewingProduct.stock} units
                                </div>
                                <div className="meta-info">
                                    <small>Product ID: {viewingProduct._id}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;
