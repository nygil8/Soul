import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ProductSkeleton from "../components/common/ProductSkeleton";
import api from "../utils/api";

/* TEMP IMAGES */
import p1 from "../assets/product1.jpg";
import p2 from "../assets/product2.jpg";
import p3 from "../assets/product3.jpg";
import p4 from "../assets/product4.jpg";

const ageTabs = ["0-1 Years", "1-6 Years", "7-12 Years"];

const categories = [
  "All",
  "Shirt",
  "Jeans",
  "Shorts",
  "T-Shirt",
  "Hoodies",
  "Jackets",
  "Combo",
];

const Boys = () => {
  const [products, setProducts] = useState([]); // All fetched products
  const [loading, setLoading] = useState(true);
  const [activeAge, setActiveAge] = useState("0-2 Yrs");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        if (res.data.success) {
          // Filter for Boys or Unisex initially from the entire catalog
          const boysProducts = res.data.data.filter(p =>
            p.gender === 'Boys' || p.gender === 'Unisex'
          );
          setProducts(boysProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter based on UI selections
  const filteredProducts = products.filter(
    (p) =>
      p.ageType === activeAge &&
      (activeCategory === "All" || p.category === activeCategory)
  );

  return (
    <div className="bg-[#f7f1e8] min-h-screen text-[#2b2b2b]">
      <Navbar />

      {/* TITLE */}
      <section className="px-6 md:px-24 pt-14">
        <h1 className="text-4xl font-serif mb-3">Boys</h1>
        <div className="h-px bg-black/20" />
      </section>

      {/* AGE TABS */}
      <section className="px-6 md:px-24 py-6 flex gap-3 overflow-x-auto">
        {ageTabs.map((age) => (
          <button
            key={age}
            onClick={() => setActiveAge(age)}
            className={`px-5 py-2 rounded-full text-sm whitespace-nowrap transition
              ${activeAge === age
                ? "bg-[#c6ab9a] text-white"
                : "bg-[#eee4d7]"
              }`}
          >
            {age}
          </button>
        ))}
      </section>

      {/* MOBILE FILTER HEADER */}
      <section className="md:hidden sticky top-0 z-40 bg-[#f7f1e8] px-6 py-4 flex justify-between items-center border-b border-black/10">
        <span className="text-sm font-medium">
          Category: <b>{activeCategory}</b>
        </span>

        <button
          onClick={() => setFilterOpen(true)}
          className="text-3xl leading-none"
        >
          ☰
        </button>
      </section>

      {/* MOBILE FILTER DRAWER */}
      {filterOpen && (
        <div className="md:hidden fixed inset-0 bg-black/40 z-50">
          <div className="absolute right-0 top-0 w-3/4 h-[100dvh] bg-[#f3ecdf] p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl">Categories</h3>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setFilterOpen(false);
                  }}
                  className={`block w-full text-left text-base ${activeCategory === cat && "font-bold"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <section className="px-6 md:px-24 pb-24 grid md:grid-cols-[240px_1fr] gap-14">

        {/* DESKTOP FILTER */}
        <aside className="hidden md:block">
          <ul className="space-y-5 text-lg font-serif">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`cursor-pointer ${activeCategory === cat && "font-bold"
                  }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
          {filteredProducts.map((item) => (
            <div key={item.id} className="group text-center">
              
              {/* IMAGE */}
              <div className="relative mb-4">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className={`w-full h-64 object-cover rounded-2xl transition
                      ${!item.stock && "opacity-60"}`}
                  />
                </Link>

                {!item.stock && (
                  <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* NAME */}
              <h3 className="text-sm font-medium mb-1 leading-snug">
                {item.name}
              </h3>

              {/* PRICE */}
              <p className="text-sm text-gray-700 mb-3">
                ₹{item.price}
              </p>

              {/* ADD TO CART */}
              <Link
                to="/cart"
                className={`inline-block px-6 py-2 rounded-full text-xs tracking-wide transition
                  ${
                    item.stock
                      ? "bg-[#c6ab9a] hover:opacity-90"
                      : "bg-gray-400 cursor-not-allowed pointer-events-none"
                  }`}
              >
                Add to Cart
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Boys;
