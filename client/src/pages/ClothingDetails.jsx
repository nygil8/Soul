import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import product1Img from "../assets/product1.jpg";
import product2Img from "../assets/product2.jpg";
import product3Img from "../assets/product3.jpg";
import product4Img from "../assets/product4.jpg";

/* ================= SIZE LOGIC ================= */

const getSizes = (ageGroup) => {
  if (ageGroup === "0-2") {
    return [
      { label: "0-3M", info: "0-3M" },
      { label: "3-6M", info: "3-6M" },
      { label: "6-12M", info: "6-12M" },
      { label: "12-24M", info: "1-2Y" },
    ];
  }

  if (ageGroup === "2-6") {
    return [
      { label: "90", info: "2Y" },
      { label: "100", info: "3Y" },
      { label: "110", info: "4Y" },
      { label: "120", info: "5Y" },
      { label: "130", info: "6Y" },
    ];
  }

  if (ageGroup === "7-12") {
    return [
      { label: "S", info: "7-8Y" },
      { label: "M", info: "9-10Y" },
      { label: "L", info: "11Y" },
      { label: "XL", info: "12Y" },
    ];
  }

  return [];
};

/* ================= PRODUCTS ================= */

const products = [
  {
    id: "1",
    name: "Premium Korean Kids Wear - Shirt",
    description: "Imported Korean fabric with premium stitching.",
    images: [product1Img, product1Img, product1Img],
    price: 1499,
    inStock: true,
    ageGroup: "0-2",
  },
  {
    id: "2",
    name: "Stylish Korean Kids Pants",
    description: "Comfortable and durable pants.",
    images: [product2Img, product2Img, product2Img],
    price: 1799,
    inStock: true,
    ageGroup: "2-6",
  },
  {
    id: "3",
    name: "Korean Kids Jacket",
    description: "Warm and trendy jacket.",
    images: [product3Img, product3Img, product3Img],
    price: 2299,
    inStock: false,
    ageGroup: "7-12",
  },
  {
    id: "4",
    name: "Kids Denim Jeans",
    description: "Classic denim jeans.",
    images: [product4Img, product4Img, product4Img],
    price: 1999,
    inStock: true,
    ageGroup: "2-6",
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

        {/* LEFT SIDE */}

        <div className="flex gap-8">

          {/* Thumbnails */}
          <div className="flex flex-col gap-4">
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

          {/* Main Image */}
          <div
            onClick={() => setZoomActive(!zoomActive)}
            onMouseMove={handleZoomMove}
            className="w-[600px] h-[600px] bg-white rounded-3xl overflow-hidden cursor-zoom-in shadow-sm"
            style={{
              backgroundImage: zoomActive ? `url(${selectedImage})` : "none",
              backgroundPosition: backgroundPos,
              backgroundRepeat: "no-repeat",
              backgroundSize: zoomActive ? "220%" : "contain",
            }}
          >
            {!zoomActive && (
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-10">

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-black/60 hover:text-black"
          >
            ← Back
          </button>

          <div>
            <h1 className="text-4xl font-serif mb-4">
              {product.name}
            </h1>

            <p className="text-2xl font-semibold mb-4">
              ₹ {product.price}
            </p>

            <p className="text-sm text-black/60 leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.inStock && (
            <>
              {/* SMALL SIZE BOXES */}

              <div>
                <p className="uppercase text-xs tracking-widest text-black/50 mb-4">
                  Select Size
                </p>

                <div className="flex flex-wrap gap-3">
                  {getSizes(product.ageGroup).map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setSize(s.label)}
                      className={`px-4 py-2 rounded-lg text-center transition text-sm
                      ${
                        size === s.label
                          ? "bg-[#d8c4b6]"
                          : "bg-white hover:shadow-md"
                      }`}
                    >
                      <div className="font-semibold text-sm">
                        {s.label}
                      </div>
                      <div className="text-[11px] text-black/60">
                        {s.info}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}

              <div className="flex items-center gap-6">
                <button
                  onClick={() => qty > 1 && setQty(qty - 1)}
                  className="w-10 h-10 rounded-full bg-white shadow"
                >
                  −
                </button>

                <span className="text-lg">{qty}</span>

                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 rounded-full bg-white shadow"
                >
                  +
                </button>
              </div>

              <button
                disabled={!size}
                className={`w-full py-4 rounded-full text-white text-base transition
                ${
                  size
                    ? "bg-[#2c2c2c] hover:bg-black"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
      </section>

      {/* SIMILAR PRODUCTS */}

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