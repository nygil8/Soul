import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import api from "../utils/api";
import toast from "react-hot-toast";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fetch Cart
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const res = await api.get("/cart");
            if (res.data.success) {
                setCartItems(res.data.data.items || []);
            }
        } catch (err) {
            console.error("Failed to fetch cart", err);
            // If 401, they are likely redirected by interceptor or need to login
            if (err.response && err.response.status === 401) {
                // Optional: Redirect explicitly if not handled by interceptor
                // navigate('/login'); 
            }
            setError("Please login to view your cart.");
        } finally {
            setLoading(false);
        }
    };

    import toast from "react-hot-toast";

    // ... (inside component)

    // Remove Item
    const removeItem = async (productId) => {
        try {
            const res = await api.delete(`/cart/remove/${productId}`);
            if (res.data.success) {
                setCartItems(res.data.data.items || []);
                toast.success("Item removed from cart");
            }
        } catch (err) {
            console.error("Failed to remove item", err);
            toast.error("Failed to remove item");
        }
    };

    // Calculate Total
    const subtotal = cartItems.reduce(
        (acc, item) => acc + (item.product?.price || 0) * item.quantity,
        0
    );

    if (loading) return <div className="text-center py-20">Loading Cart...</div>;

    return (
        <div className="bg-[#f7f1e8] min-h-screen text-[#2b2b2b]">
            <Navbar />

            <section className="px-6 md:px-24 py-10">
                <h1 className="text-4xl font-serif mb-8 text-center md:text-left">
                    Your Cart ({cartItems.length})
                </h1>

                {error ? (
                    <div className="text-center py-10">
                        <p className="text-lg mb-4">{error}</p>
                        <Link to="/login" className="bg-[#2b2b2b] text-white px-6 py-3 rounded-full">Login Now</Link>
                    </div>
                ) : cartItems.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl shadow-sm">
                        <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">
                            Looks like you haven't added anything yet.
                        </p>
                        <Link
                            to="/"
                            className="bg-[#c6ab9a] text-white px-8 py-3 rounded-full hover:opacity-90 transition"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10">
                        {/* CART ITEMS LIST */}
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white p-4 rounded-2xl flex gap-6 items-center shadow-sm"
                                >
                                    <Link to={`/product/${item.product?._id}`}>
                                        <img
                                            src={item.product?.image || "https://via.placeholder.com/150"}
                                            alt={item.product?.name}
                                            className="w-24 h-24 object-cover rounded-xl"
                                        />
                                    </Link>

                                    <div className="flex-1">
                                        <Link to={`/product/${item.product?._id}`}>
                                            <h3 className="font-semibold text-lg hover:underline">
                                                {item.product?.name || "Product Unavailable"}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-500 text-sm">
                                            Price: ₹{item.product?.price}
                                        </p>
                                        <div className="mt-2 flex items-center gap-4">
                                            <span className="bg-[#f3ecdf] px-3 py-1 rounded-lg text-sm">
                                                Qty: {item.quantity}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-bold text-lg mb-2">
                                            ₹{(item.product?.price || 0) * item.quantity}
                                        </p>
                                        <button
                                            onClick={() => removeItem(item.product?._id)}
                                            className="text-red-500 text-sm hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ORDER SUMMARY */}
                        <div className="bg-white p-8 rounded-3xl h-fit shadow-md">
                            <h2 className="text-2xl font-serif mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="h-px bg-gray-200 my-2" />
                                <div className="flex justify-between text-black font-bold text-lg">
                                    <span>Total</span>
                                    <span>₹{subtotal}</span>
                                </div>
                            </div>

                            <Link to="/checkout" className="block text-center w-full bg-[#2b2b2b] text-white py-4 rounded-full font-medium hover:opacity-90 transition">
                                Proceed to Checkout
                            </Link>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                Secure Checkout • Free Returns
                            </p>
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default Cart;