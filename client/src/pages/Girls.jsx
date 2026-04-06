import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import api from "../utils/api";
import { Helmet } from "react-helmet-async";

/* AGE GROUPS */
const ageTabs = ["0-1 Years", "1-6 Years", "7-12 Years"];

/* CATEGORIES */
const categories = [
  "All",
  "Frocks",
  "Tops",
  "Jeans",
  "Skirts",
  "Party Wear",
  "Combo",
];

const Girls = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAge, setActiveAge] = useState("0-1 Years");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        if (res.data.success) {
          // Filter for Girls or Unisex
          const girlsProducts = res.data.data.filter(p =>
            p.gender === 'Girls' || p.gender === 'Unisex'
          );
          setProducts(girlsProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.ageType === activeAge &&
      (activeCategory === "All" || p.category === activeCategory)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "priceAsc") return a.price - b.price;
    if (sortOrder === "priceDesc") return b.price - a.price;
    if (sortOrder === "latest") {
      const idA = a._id || a.id;
      const idB = b._id || b.id;
      return idB.toString().localeCompare(idA.toString());
    }
    return 0;
  });

  return (
    <div className="bg-[#f7f1e8] min-h-screen text-[#2b2b2b]">
      <Navbar />

      {/* TITLE */}
      <section className="px-6 md:px-24 pt-14">
        <h1 className="text-4xl font-serif mb-3">Girls</h1>
        <div className="h-px bg-black/20" />
      </section>

      {/* AGE TABS & SORT */}
      <section className="px-6 md:px-24 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-3 overflow-x-auto max-w-full pb-2 md:pb-0">
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
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm font-medium">Sort:</span>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-black/20 rounded-full px-4 py-1.5 text-sm bg-transparent outline-none cursor-pointer focus:border-black/40"
          >
            <option value="latest">Latest</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedProducts.map((item) => (
            <div key={item._id || item.id} className="group text-center">
              {/* IMAGE */}
              <div className="relative mb-4">
                <Link to={`/product/${item._id || item.id}`}>
                  <img
                    src={item.image || item.img || "https://via.placeholder.com/300?text=No+Image"}
                    alt={item.name}
                    className={`w-full h-60 sm:h-72 object-cover rounded-2xl mb-3 ${(!item.stock || item.stock <= 0) && "opacity-60"
                      }`}
                  />
                </Link>
              </div>

              {/* NAME */}
              <h3 className="text-sm font-medium mb-1">
                {item.name}
              </h3>

              {/* PRICE */}
              <p className="text-sm mb-3">{item.price}</p>

              {/* ADD TO CART */}
              <Link
                to="/cart"
                className={`inline-block px-5 py-2 rounded-full text-sm transition
                  ${item.stock
                    ? "bg-[#c6ab9a] hover:opacity-90"
                    : "bg-gray-400 pointer-events-none"
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

export default Girls;
