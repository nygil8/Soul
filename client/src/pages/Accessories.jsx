import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";
import api from "../utils/api";

const categories = [
  "All",
  "Bags",
  "Socks",
  "Stockings",
  "Hairbands",
  "Hair Clips",
  "Hair Bows",
  "Rings",
  "Chains",
  "Specs",
];

const Accessories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        if (res.data.success) {
          // Broad filter for any accessory-like categories
          // Or strict match if you have an 'Accessory' parent category
          const accProducts = res.data.data.filter(p =>
            categories.includes(p.category) || p.category === 'Accessories'
          );
          setProducts(accProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredItems = products.filter((p) =>
    activeCategory === "All" || p.category === activeCategory
  );

  return (
    <div className="bg-[#f7f1e8] min-h-screen text-[#2b2b2b]">
      <Navbar />

      {/* TITLE */}
      <section className="px-6 md:px-24 pt-14">
        <h1 className="text-4xl font-serif mb-3">Accessories</h1>
        <div className="h-px bg-black/20" />
      </section>

      {/* CATEGORY FILTER */}
      <section className="px-6 md:px-24 py-6 flex gap-3 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm whitespace-nowrap transition
              ${activeCategory === cat
                ? "bg-[#c6ab9a] text-white"
                : "bg-[#eee4d7]"
              }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* PRODUCTS */}
      <section className="px-6 md:px-24 pb-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredItems.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No accessories found.</div>
          ) : (
            filteredItems.map((item) => (
              <div key={item._id} className="text-center group">
                <div className="relative">
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.image || "https://via.placeholder.com/300"}
                      alt={item.name}
                      className={`w-full h-60 object-cover rounded-2xl mb-3 ${(!item.stock || item.stock <= 0) && "opacity-60"
                        }`}
                    />
                  </Link>

                  {(!item.stock || item.stock <= 0) && (
                    <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>

                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>

                <Link
                  to={`/product/${item._id}`}
                  className={`inline-block px-5 py-2 rounded-full text-sm transition mt-2
                  ${item.stock > 0
                      ? "bg-[#c6ab9a] hover:opacity-90"
                      : "bg-gray-400 cursor-not-allowed pointer-events-none"
                    }`}
                >
                  View Details
                </Link>
              </div>
            ))
          ))}
      </section>

      <Footer />
    </div>
  );
};

export default Accessories;
