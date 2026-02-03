import { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import a1 from "../assets/product1.jpg";
import a2 from "../assets/product2.jpg";
import a3 from "../assets/product3.jpg";
import a4 from "../assets/product4.jpg";

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

const accessories = [
  { id: 1, img: a1, category: "Hairbands", stock: true },
  { id: 2, img: a2, category: "Bags", stock: true },
  { id: 3, img: a3, category: "Specs", stock: false },
  { id: 4, img: a4, category: "Socks", stock: true },
];

const Accessories = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? accessories
      : accessories.filter((i) => i.category === activeCategory);

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
              ${
                activeCategory === cat
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
        {filteredItems.map((item) => (
          <div key={item.id} className="text-center group">
            <div className="relative">
              <img
                src={item.img}
                alt=""
                className={`w-full h-60 object-cover rounded-2xl mb-3 ${
                  !item.stock && "opacity-60"
                }`}
              />

              {!item.stock && (
                <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            <button
              disabled={!item.stock}
              className={`px-5 py-2 rounded-full text-sm transition
                ${
                  item.stock
                    ? "bg-[#c6ab9a] hover:opacity-90"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default Accessories;
