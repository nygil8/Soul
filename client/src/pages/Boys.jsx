import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ProductSkeleton from "../components/common/ProductSkeleton";
import api from "../utils/api";

// Matches DB 'ageType' enum
const ageTabs = ["0-2 Yrs", "3-6 Yrs", "7-12 Yrs"];

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
        {loading ? (
          <ProductSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-10 text-gray-500">No products found for this category.</div>
            ) : (
              filteredProducts.map((item) => (
                <div key={item._id} className="group text-center">

                  {/* IMAGE WRAPPER */}
                  <div className="relative">
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={item.image || "https://via.placeholder.com/300?text=No+Image"}
                        alt={item.name}
                        className={`
                          w-full 
                          h-60 sm:h-72 
                          object-cover 
                          rounded-2xl 
                          mb-3 
                          transition
                          ${!item.stock > 0 && "opacity-60"}
                        `}
                      />
                    </Link>

                    {/* OUT OF STOCK BADGE */}
                    {(!item.stock || item.stock <= 0) && (
                      <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full tracking-wide">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* INFO */}
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>

                  {/* VIEW DETAILS / ADD TO CART */}
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
            )}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Boys;
