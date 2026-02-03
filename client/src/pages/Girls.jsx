import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

/* TEMP IMAGES */
import g1 from "../assets/product1.jpg";
import g2 from "../assets/product2.jpg";
import g3 from "../assets/product3.jpg";
import g4 from "../assets/product4.jpg";

/* AGE GROUPS */
const ageTabs = ["0-2 Years", "2-6 Years", "7-12 Years"];

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

/* PRODUCTS */
const products = [
  { id: 1, img: g1, age: "0-2 Years", category: "Combo", stock: true },
  { id: 2, img: g2, age: "0-2 Years", category: "Frocks", stock: true },
  { id: 3, img: g3, age: "2-6 Years", category: "Party Wear", stock: false },
  { id: 4, img: g4, age: "7-12 Years", category: "Jeans", stock: true },
];

const Girls = () => {
  const [activeAge, setActiveAge] = useState("0-2 Years");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredProducts = products.filter(
    (p) =>
      p.age === activeAge &&
      (activeCategory === "All" || p.category === activeCategory)
  );

  return (
    <div className="bg-[#f7f1e8] min-h-screen text-[#2b2b2b] flex flex-col">
      <Navbar />

      {/* TITLE */}
      <section className="px-6 md:px-24 pt-14">
        <h1 className="text-4xl font-serif mb-3">Girls</h1>
        <div className="h-px bg-black/20" />
      </section>

      {/* AGE TABS */}
      <section className="px-6 md:px-24 py-6 flex gap-3 overflow-x-auto">
        {ageTabs.map((age) => (
          <button
            key={age}
            onClick={() => setActiveAge(age)}
            className={`px-5 py-2 rounded-full text-sm whitespace-nowrap transition
              ${
                activeAge === age
                  ? "bg-[#c6ab9a] text-white"
                  : "bg-[#eee4d7]"
              }`}
          >
            {age}
          </button>
        ))}
      </section>

      {/* MOBILE FILTER BAR */}
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
          <div className="absolute right-0 top-0 w-3/4 h-full bg-[#f3ecdf] p-6 overflow-y-auto">
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
                  className={`block w-full text-left text-base ${
                    activeCategory === cat && "font-bold"
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
      <section className="px-6 md:px-24 pb-28 grid md:grid-cols-[240px_1fr] gap-14 flex-1">
        
        {/* DESKTOP FILTER */}
        <aside className="hidden md:block">
          <ul className="space-y-5 text-lg font-serif">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`cursor-pointer ${
                  activeCategory === cat && "font-bold"
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div key={item.id} className="text-center">
              
              {/* IMAGE */}
              <div className="relative">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.img}
                    alt="Product"
                    className={`w-full aspect-[3/4] object-cover rounded-2xl mb-3 ${
                      !item.stock && "opacity-60"
                    }`}
                  />
                </Link>

                {!item.stock && (
                  <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* BUTTON */}
              <Link
                to="/cart"
                className={`inline-block px-5 py-2 rounded-full text-sm transition
                  ${
                    item.stock
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
