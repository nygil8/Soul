import { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";

import p1 from "../assets/product1.jpg";
import p2 from "../assets/product2.jpg";
import p3 from "../assets/product3.jpg";

const ageGroups = ["2-3 Years", "4-6 Years", "7-9 Years", "10-12 Years"];
const types = ["All", "Sneakers", "Boots", "Sandals"];

const ageSizeMap = {
  "2-3 Years": [13, 14],
  "4-6 Years": [17, 18, 19, 20, 21],
  "7-9 Years": [22, 23, 24, 25, 26, 27],
  "10-12 Years": [28, 29, 30, 31, 32, 33],
};

const shoes = [
  { id: 1, img: p1, type: "Sneakers", size: 22, stock: true },
  { id: 2, img: p2, type: "Boots", size: 28, stock: false },
  { id: 3, img: p3, type: "Sandals", size: 19, stock: true },
];

const Shoes = () => {
  const [activeAge, setActiveAge] = useState("4-6 Years");
  const [activeType, setActiveType] = useState("All");

  const filteredShoes = shoes.filter((shoe) => {
    const sizeMatch = ageSizeMap[activeAge].includes(shoe.size);
    const typeMatch =
      activeType === "All" || shoe.type === activeType;
    return sizeMatch && typeMatch;
  });

  return (
    <div className="bg-[#f7f1e8] min-h-screen">
      <Navbar />

      {/* TITLE */}
      <section className="px-6 md:px-24 pt-14">
        <h1 className="text-4xl font-serif mb-3">Kids Shoes</h1>
        <div className="h-px bg-black/20" />
      </section>

      {/* AGE FILTER */}
      <section className="px-6 md:px-24 py-6 flex gap-3 overflow-x-auto">
        {ageGroups.map((age) => (
          <button
            key={age}
            onClick={() => setActiveAge(age)}
            className={`px-5 py-2 rounded-full text-sm whitespace-nowrap
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

      {/* TYPE FILTER */}
      <section className="px-6 md:px-24 pb-6 flex gap-3 overflow-x-auto">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`text-sm px-4 py-2 rounded-full
              ${
                activeType === t
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
          >
            {t}
          </button>
        ))}
      </section>

      {/* PRODUCTS */}
      <section className="px-6 md:px-24 pb-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredShoes.map((item) => (
          <div key={item.id} className="text-center">
            <div className="relative">
              <img
                src={item.img}
                className={`w-full h-56 object-cover rounded-xl ${
                  !item.stock && "opacity-60"
                }`}
                alt=""
              />

              {!item.stock && (
                <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            <p className="text-xs mt-2">
              Size: {item.size} • {item.type}
            </p>

            <button
              disabled={!item.stock}
              className={`mt-2 px-5 py-2 rounded-full text-sm
                ${
                  item.stock
                    ? "bg-[#c6ab9a]"
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

export default Shoes;
