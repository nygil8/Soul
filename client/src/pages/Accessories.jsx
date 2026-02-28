import { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";

import a1 from "../assets/product1.jpg";
import a2 from "../assets/product2.jpg";
import a3 from "../assets/product3.jpg";
import a4 from "../assets/product4.jpg";

/* CATEGORIES */
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

/* ACCESSORIES DATA */
export const accessoriesData = [
  {
    id: 1,
    img: a1,
    name: "Cute Floral Hairband",
    price: 299,
    category: "Hairbands",
    stock: true,
    description:
      "Soft elastic floral hairband perfect for daily wear and parties.",
  },
  {
    id: 2,
    img: a2,
    name: "Mini Kids Backpack",
    price: 799,
    category: "Stockings",
    stock: true,
    description:
      "Lightweight mini backpack ideal for school and outings.",
  },
  {
    id: 3,
    img: a3,
    name: "Kids Fashion Specs",
    price: 399,
    category: "Specs",
    stock: false,
    description:
      "Stylish fashion glasses made with safe plastic frame.",
  },
  {
    id: 4,
    img: a4,
    name: "Soft Cotton Socks",
    price: 199,
    category: "Socks",
    stock: true,
    description:
      "Premium breathable cotton socks for everyday comfort.",
  },
];

const Accessories = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? accessoriesData
      : accessoriesData.filter((i) => i.category === activeCategory);

  return (
    <div className="bg-[#f7f1e8] min-h-screen text-[#2b2b2b]">
      <Navbar />

      <section className="px-6 md:px-24 pt-14">
        <h1 className="text-4xl font-serif mb-3">Accessories</h1>
        <div className="h-px bg-black/20" />
      </section>

      {/* FILTER */}
      
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

      {/* GRID */}
      <section className="px-6 md:px-24 pb-28 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="text-center group">
            <Link to={`/accessories/${item.id}`}>
              <div className="relative mb-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className={`w-full aspect-[3/4] object-cover rounded-2xl transition group-hover:scale-105 duration-300 ${
                    !item.stock && "opacity-60"
                  }`}
                />
                {!item.stock && (
                  <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>
            </Link>

            <h3 className="text-sm font-medium">{item.name}</h3>
            <p className="text-sm font-semibold mt-1">₹{item.price}</p>
            <p className="text-xs text-black/60 mt-1">{item.category}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default Accessories;