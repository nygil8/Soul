import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ProductSkeleton from "../components/common/ProductSkeleton";

const Search = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // If no keyword, passing empty string usually returns all or we can skip
                const query = keyword ? `?keyword=${keyword}` : "";
                const res = await api.get(`/products${query}`);
                if (res.data.success) {
                    setProducts(res.data.data);
                }
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [keyword]);

    return (
        <div className="bg-[#f7f1e8] min-h-screen text-[#2b2b2b]">
            <Navbar />

            <section className="px-6 md:px-24 py-10">
                <h1 className="text-3xl font-serif mb-2">Search Results</h1>
                <p className="text-gray-500 mb-8">
                    {keyword ? `Showing results for "${keyword}"` : "All Products"}
                </p>

                {loading ? (
                    <ProductSkeleton count={8} />
                ) : products.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl shadow-sm">
                        <h2 className="text-xl font-medium mb-2">No matches found</h2>
                        <p className="text-gray-500 mb-6">Try checking your spelling or using different keywords.</p>
                        <Link to="/" className="text-[#c6ab9a] underline hover:text-[#b79a89]">Back to Home</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {products.map((item) => (
                            <div key={item._id} className="text-center group bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
                                <Link to={`/product/${item._id}`}>
                                    <div className="relative overflow-hidden rounded-xl mb-4">
                                        <img
                                            src={item.image || "https://via.placeholder.com/300"}
                                            alt={item.name}
                                            className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-500"
                                        />
                                        {!item.stock && (
                                            <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">Out of Stock</span>
                                        )}
                                    </div>
                                    <h3 className="font-medium text-lg mb-1 line-clamp-1">{item.name}</h3>
                                    <p className="text-[#c6ab9a] font-bold">₹{item.price}</p>
                                    <button className="mt-3 w-full border border-[#c6ab9a] text-[#c6ab9a] py-2 rounded-full text-sm hover:bg-[#c6ab9a] hover:text-white transition">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default Search;
