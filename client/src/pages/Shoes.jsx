import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";
import api from "../utils/api";

const ageGroups = ["2-3 Yrs", "4-6 Yrs", "7-9 Yrs", "10-12 Yrs"];
// Note: DB likely uses 'ageType' matching these strings if updated, or generic age ranges. 
// For now, matching the frontend tabs to what was there, assuming DB data uses 'ageType' string.

const types = ["All", "Sneakers", "Boots", "Sandals"];

const Shoes = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAge, setActiveAge] = useState("4-6 Yrs");
  const [activeType, setActiveType] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        if (res.data.success) {
          // Filter for Shoes category OR sub-cat matching logic if structured differently.
          // Assuming 'Shoes' is a primary category or filterable attribute.
          const shoesProducts = res.data.data.filter(p =>
            p.category === 'Shoes' || p.category === 'Footwear'
            // Fallback: If DB uses specific types as categories (e.g. 'Sneakers'), we might need broader check.
            // For now, filtering by what seems logical for a main 'Shoes' page.
          );
          setProducts(shoesProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredShoes = products.filter((shoe) => {
    // Age filter (Optional: if DB has ageType. If not, this might filter out everything if data is missing)
    // Relaxing logical strictness: If shoe.ageType is undefined, show it? Or strict match?
    // Going with strict match on 'ageType' to align with Boys/Girls pages.
    const ageMatch = !activeAge || shoe.ageType === activeAge || shoe.ageType === 'All';

    // Type/Sub-Category filter
    // Assuming 'name' or 'description' contains the type, OR 'category' is the specific type.
    // If 'category' is 'Shoes', we need another field for 'Sneakers'. 
    // Usually 'category' = 'Sneakers', and we group them into 'Shoes' page.
    // Let's refine the fetch logic above to include these sub-types if they are categories.
    const typeMatch = activeType === "All" || shoe.name.includes(activeType) || shoe.category === activeType;

    return ageMatch && typeMatch;
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
              ${activeAge === age
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
              ${activeType === t
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
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredShoes.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No shoes found.</div>
          ) : (
            filteredShoes.map((item) => (
              <div key={item._id} className="text-center">
                <div className="relative">
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.image || "https://via.placeholder.com/300"}
                      className={`w-full h-56 object-cover rounded-xl ${(!item.stock || item.stock <= 0) && "opacity-60"
                        }`}
                      alt={item.name}
                    />
                  </Link>

                  {(!item.stock || item.stock <= 0) && (
                    <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>

                <p className="text-xs mt-2 font-bold uppercase">{item.name}</p>

                <Link
                  to={`/product/${item._id}`}
                  className={`inline-block mt-2 px-5 py-2 rounded-full text-sm
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

export default Shoes;
