import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import shoesData from "../data/shoesData";

/* ================= SIZE MAP ================= */

const ageSizeMap = {
  "1-4": [20, 21, 22, 23, 24],
  "5-8": [25, 26, 27, 28, 29, 30],
  "9-12": [30, 31, 32, 33, 34, 35, 36, 37],
};

const sizeGuide = {
  20: { age: "1 – 2 Years", cm: "12.0 cm" },
  21: { age: "1 – 2 Years", cm: "12.5 cm" },
  22: { age: "2 Years", cm: "13.0 cm" },
  23: { age: "3 Years", cm: "14.0 cm" },
  24: { age: "3 – 4 Years", cm: "14.5 cm" },
  25: { age: "4 Years", cm: "15.0 cm" },
  26: { age: "5 Years", cm: "16.0 cm" },
  27: { age: "5 – 6 Years", cm: "16.5 cm" },
  28: { age: "6 Years", cm: "17.0 cm" },
  29: { age: "6 – 7 Years", cm: "18.0 cm" },
  30: { age: "7 Years", cm: "18.5 cm" },
  31: { age: "7 – 8 Years", cm: "19.0 cm" },
  32: { age: "8 Years", cm: "20.0 cm" },
  33: { age: "8 – 9 Years", cm: "20.5 cm" },
  34: { age: "9 Years", cm: "21.0 cm" },
  35: { age: "10 Years", cm: "22.0 cm" },
  36: { age: "11 Years", cm: "23.0 cm" },
  37: { age: "11 – 12 Years", cm: "23.5 cm" },
};

const ShoesDetails = () => {
  const { id, age } = useParams();
  const navigate = useNavigate();
  const product = shoesData.find((item) => item.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(product?.img);
  const [zoomActive, setZoomActive] = useState(false);
  const [backgroundPos, setBackgroundPos] = useState("center");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product Not Found
      </div>
    );
  }

  const availableSizes = ageSizeMap[age] || [];
  const images = product.images || [product.img];

  const similarProducts = shoesData
    .filter((item) => item.type === product.type && item.id !== product.id)
    .slice(0, 4);

  const handleZoomMove = (e) => {
    if (!zoomActive) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setBackgroundPos(`${x}% ${y}%`);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    existingCart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: selectedImage,
      qty: quantity,
      size: selectedSize,
      ageGroup: age,
    });

    localStorage.setItem("cart", JSON.stringify(existingCart));
    navigate("/cart");
  };

  return (
    <div className="bg-[#f8f6f2] min-h-screen text-[#2c2c2c]">
      <Navbar />

      <section className="px-6 md:px-28 py-20 grid md:grid-cols-2 gap-24">

        {/* LEFT SIDE */}
        <div className="flex gap-8">

          {/* Thumbnails */}
          <div className="flex flex-col gap-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImage(img)}
                className={`w-24 h-24 object-cover rounded-xl cursor-pointer transition
                ${selectedImage === img
                    ? "scale-105"
                    : "opacity-70 hover:opacity-100"}`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div
            onClick={() => setZoomActive(!zoomActive)}
            onMouseMove={handleZoomMove}
            className="w-[700px] h-[700px] bg-white rounded-3xl overflow-hidden cursor-zoom-in"
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
                className="w-full h-full object-contain"
              />
            )}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-12">

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-black/60 hover:text-black"
          >
            ← Back
          </button>

          <div>
            <h1 className="text-5xl font-serif mb-6">
              {product.name}
            </h1>

            <p className="text-3xl font-semibold mb-6">
              ₹{product.price}
            </p>

            <p className="text-base text-black/60 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* SIZE */}
          <div>
            <p className="uppercase text-xs tracking-widest text-black/50 mb-6">
              Choose Size
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`p-5 rounded-2xl text-left transition
                  ${selectedSize === size
                      ? "bg-[#d8c4b6]"
                      : "bg-white hover:shadow-lg"}`}
                >
                  <p className="font-semibold text-base">EU {size}</p>
                  <p className="text-sm text-black/70">
                    {sizeGuide[size]?.cm}
                  </p>
                  <p className="text-xs text-black/50">
                    {sizeGuide[size]?.age}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="w-12 h-12 rounded-full bg-white shadow"
            >
              −
            </button>

            <span className="text-xl">{quantity}</span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 rounded-full bg-white shadow"
            >
              +
            </button>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="w-full py-5 rounded-full bg-[#bfa89e] hover:bg-[#a78f85] text-white transition text-xl"
          >
            Add to Cart
          </button>

        </div>
      </section>

      {/* SIMILAR PRODUCTS */}
      <section className="px-6 md:px-28 pb-24">
        <h2 className="text-3xl font-serif mb-12">
          Similar Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {similarProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/shoes/${age}/${item.id}`)}
              className="cursor-pointer group"
            >
              <div className="rounded-2xl overflow-hidden mb-4 bg-white shadow-sm group-hover:shadow-xl transition">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <p className="text-base font-medium">{item.name}</p>
              <p className="text-sm text-black/60">₹{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShoesDetails;