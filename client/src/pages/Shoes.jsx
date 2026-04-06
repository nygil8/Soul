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
  const [sortOrder, setSortOrder] = useState("latest");

  // Convert "1-4 Years" → "1-4"
  const formatAgeForURL = (age) => {
    return age.split(" ")[0];
  };

  const filteredShoes = shoesData.filter((shoe) => {
    const sizeMatch = ageSizeMap[activeAge].includes(shoe.size);
    const typeMatch = activeType === "All" || shoe.type === activeType;
    return sizeMatch && typeMatch;
  });

  const sortedShoes = [...filteredShoes].sort((a, b) => {
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
              ${activeAge === age
                ? "bg-[#c6ab9a] text-white"
                : "bg-[#eee4d7]"
              }`}
          >
            {age}
          </button>
        ))}
      </section>

      {/* TYPE FILTER & SORT */}
      <section className="px-6 md:px-24 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-3 overflow-x-auto max-w-full pb-2 md:pb-0">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-4 py-2 rounded-full text-sm transition
                ${activeType === t
                  ? "bg-black text-white"
                  : "bg-white"
                }`}
            >
              {t}
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

      {/* PRODUCTS GRID */}
      <section className="px-6 md:px-24 pb-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
        {sortedShoes.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No shoes found.</div>
        ) : (
          sortedShoes.map((item) => (
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

                {(!item.stock || item.stock <= 0) && (
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
          ))
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Shoes;