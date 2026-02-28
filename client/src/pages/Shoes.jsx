import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import shoesData from "../data/shoesData";

const ageGroups = ["1-4 Years", "5-8 Years", "9-12 Years"];
const types = ["All", "Sneakers", "Boots", "Sandals"];

const ageSizeMap = {
  "1-4 Years": [20, 21, 22, 23, 24],
  "5-8 Years": [25, 26, 27, 28, 29, 30],
  "9-12 Years": [30, 31, 32, 33, 34, 35, 36, 37],
};

const Shoes = () => {
  const [activeAge, setActiveAge] = useState("1-4 Years");
  const [activeType, setActiveType] = useState("All");

  // Convert "1-4 Years" → "1-4"
  const formatAgeForURL = (age) => {
    return age.split(" ")[0];
  };

  const filteredShoes = shoesData.filter((shoe) => {
    const sizeMatch = ageSizeMap[activeAge].includes(shoe.size);
    const typeMatch = activeType === "All" || shoe.type === activeType;
    return sizeMatch && typeMatch;
  });

  return (
    <div className="bg-[#f7f1e8] min-h-screen text-[#2b2b2b]">
      <Navbar />

      {/* TITLE */}
      <section className="px-6 md:px-24 pt-14">
        <h1 className="text-4xl font-serif mb-3">Shoes</h1>
        <div className="h-px bg-black/20" />
      </section>

      {/* AGE TABS */}
      <section className="px-6 md:px-24 py-6 flex gap-3 overflow-x-auto">
        {ageGroups.map((age) => (
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

      {/* TYPE FILTER */}
      <section className="px-6 md:px-24 pb-8 flex gap-3 overflow-x-auto">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`px-4 py-2 rounded-full text-sm transition
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

      {/* PRODUCTS GRID */}
      <section className="px-6 md:px-24 pb-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredShoes.map((item) => (
          <div key={item.id} className="group text-center">

            <div className="relative mb-4">
              <Link to={`/shoes/${formatAgeForURL(activeAge)}/${item.id}`}>
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

            <h3 className="text-sm font-medium mb-1 leading-snug">
              {item.name}
            </h3>

            <p className="text-sm text-gray-700 mb-1">
              ₹{item.price}
            </p>

            <p className="text-xs text-black/60">
              Size {item.size} • {item.type}
            </p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default Shoes;