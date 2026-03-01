import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import product1Img from "../assets/product1.jpg";
import product2Img from "../assets/product2.jpg";
import product3Img from "../assets/product3.jpg";
import product4Img from "../assets/product4.jpg";

/* ================= SIZE LOGIC (PARENT FRIENDLY) ================= */

const getSizes = (ageGroup) => {
  // 0 - 1 Year (Months clearly written)
  if (ageGroup === "0-1") {
    return [
      { label: "S", info: "0 - 3 Months" },
      { label: "M", info: "3 - 5 Months" },
      { label: "L", info: "5 - 7 Months" },
      { label: "XL", info: "7 - 12 Months" },
    ];
  }

  // 1 - 6 Years (Height Based - Easy for parents)
  if (ageGroup === "1-6") {
    return [
      { label: "90", info: "1 - 2 Years" },
      { label: "100", info: "2 - 3 Years" },
      { label: "110", info: "3 - 4 Years" },
      { label: "120", info: "4 - 5 Years" },
      { label: "130", info: "5 - 6 Years" },
    ];
  }

  // 7 - 12 Years
  if (ageGroup === "7-12") {
    return [
      { label: "S", info: "7 - 8 Years" },
      { label: "M", info: "9 - 10 Years" },
      { label: "L", info: "11 Years" },
      { label: "XL", info: "12 Years" },
    ];
  }

  return [];
};

/* ================= PRODUCTS ================= */

const products = [
  {
    id: "1",
    name: "Premium Korean Kids Wear - Shirt",
    description:
      "Imported Korean fabric with premium stitching. Soft, breathable and perfect for daily wear.",
    images: [product1Img, product1Img, product1Img],
    price: 1499,
    inStock: true,
    ageGroup: "0-1",
  },
  {
    id: "2",
    name: "Stylish Korean Kids Pants",
    description:
      "Comfortable and durable pants made with high-quality stretch fabric.",
    images: [product2Img, product2Img, product2Img],
    price: 1799,
    inStock: true,
    ageGroup: "1-6",
  },
  {
    id: "3",
    name: "Korean Kids Jacket",
    description: "Warm and trendy jacket perfect for winter styling.",
    images: [product3Img, product3Img, product3Img],
    price: 2299,
    inStock: true,
    ageGroup: "7-12",
  },
  {
    id: "4",
    name: "Kids Denim Jeans",
    description: "Classic denim jeans with modern Korean fit.",
    images: [product4Img, product4Img, product4Img],
    price: 1999,
    inStock: true,
    ageGroup: "1-6",
  },
];

const ClothingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id) || products[0];

  const relatedProducts = products.filter(
    (p) => p.id !== product.id && p.ageGroup === product.ageGroup
  );

  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [zoomActive, setZoomActive] = useState(false);
  const [backgroundPos, setBackgroundPos] = useState("center");

  const handleZoomMove = (e) => {
    if (!zoomActive) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setBackgroundPos(`${x}% ${y}%`);
  };

  return (
    <div className="bg-[#f8f6f2] min-h-screen text-[#2c2c2c]">
      <Navbar />

      <section className="px-6 md:px-28 py-20 grid md:grid-cols-2 gap-24">

        {/* LEFT SIDE (UNCHANGED STRUCTURE) */}

        <div className="flex flex-col md:flex-row gap-8">

          <div
            onClick={() => setZoomActive(!zoomActive)}
            onMouseMove={handleZoomMove}
            className="order-1 md:order-2 w-full md:w-[700px] h-[400px] md:h-[700px] bg-white rounded-3xl overflow-hidden cursor-zoom-in shadow-sm"
            style={{
              backgroundImage: zoomActive ? `url(${selectedImage})` : "none",
              backgroundPosition: backgroundPos,
              backgroundRepeat: "no-repeat",
              backgroundSize: zoomActive ? "220%" : "100%",
            }}
          >
            {!zoomActive && (
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="order-2 md:order-1 flex flex-row md:flex-col gap-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => {
                  setSelectedImage(img);
                  setZoomActive(false);
                }}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition
                ${
                  selectedImage === img
                    ? "scale-105"
                    : "opacity-70 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ================= RIGHT SIDE (PINTEREST STYLE ENHANCED) ================= */}

        <div className="space-y-10 bg-white p-10 rounded-3xl shadow-xl h-fit">

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-black/50 hover:text-black transition"
          >
            ← Back
          </button>

          <div>
            <h1 className="text-4xl font-serif leading-tight mb-4">
              {product.name}
            </h1>

            <p className="text-3xl font-bold mb-6">
              ₹ {product.price}
            </p>

            <p className="text-sm text-black/60 leading-relaxed border-l-2 border-[#d8c4b6] pl-4">
              {product.description}
            </p>
          </div>

          {product.inStock && (
            <>
              {/* SIZE */}
              <div>
                <p className="uppercase text-xs tracking-widest text-black/50 mb-4">
                  Select Size
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {getSizes(product.ageGroup).map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setSize(s.label)}
                      className={`p-4 rounded-xl border text-left transition-all
                      ${
                        size === s.label
                          ? "border-black bg-[#f1ece6]"
                          : "border-gray-200 hover:border-black"
                      }`}
                    >
                      <div className="font-semibold text-base">
                        {s.label}
                      </div>
                      <div className="text-xs text-black/60">
                        {s.info}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY */}
              <div>
                <p className="uppercase text-xs tracking-widest text-black/50 mb-3">
                  Quantity
                </p>

                <div className="flex items-center gap-6">
                  <button
                    onClick={() => qty > 1 && setQty(qty - 1)}
                    className="w-12 h-12 rounded-full bg-[#f1ece6] text-lg"
                  >
                    −
                  </button>

                  <span className="text-xl font-medium">{qty}</span>

                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-12 h-12 rounded-full bg-[#f1ece6] text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ADD TO CART */}
              <button
                disabled={!size}
                className={`w-full py-5 rounded-full text-white text-base tracking-wide transition
                ${
                  size
                    ? "bg-black hover:bg-[#2c2c2c]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
      </section>

      {/* SIMILAR PRODUCTS (UNCHANGED) */}

      <section className="px-6 md:px-28 pb-24">
        <h2 className="text-3xl font-serif mb-10">
          Similar Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {relatedProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              className="cursor-pointer group"
            >
              <div className="rounded-2xl overflow-hidden mb-3 bg-white shadow-sm group-hover:shadow-xl transition">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <p className="text-sm font-medium">
                {item.name}
              </p>
              <p className="text-sm text-black/60">
                ₹ {item.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClothingDetails;