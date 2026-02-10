import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import toast from "react-hot-toast";

const Checkout = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        address: "123 Test St",
        city: "Test City",
        state: "TS",
        postalCode: "123456",
        country: "India",
        phone: "9999999999"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/orders', { shippingAddress: formData });
            if (res.data.success) {
                toast.success("Order placed successfully! 🎉");
                navigate('/my-account'); // or order success
            }
        } catch (error) {
            console.error("Checkout failed", error);
            toast.error(error.response?.data?.message || "Checkout failed");
        }
    };

    return (
        <div className="bg-[#f7f1e8] min-h-screen text-[#2b2b2b]">
            <Navbar />
            <div className="max-w-2xl mx-auto py-10 px-6">
                <h1 className="text-3xl font-serif mb-8">Checkout</h1>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl shadow-sm">
                    <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full border p-3 rounded" required />
                    <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full border p-3 rounded" required />
                    <div className="grid grid-cols-2 gap-4">
                        <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full border p-3 rounded" required />
                        <input name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code" className="w-full border p-3 rounded" required />
                    </div>
                    <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="w-full border p-3 rounded" required />
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full border p-3 rounded" required />

                    <button type="submit" className="w-full bg-[#c6ab9a] text-white py-3 rounded-full font-bold hover:opacity-90 transition">
                        Place Order
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;