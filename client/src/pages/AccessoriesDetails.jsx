import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { accessoriesData } from "./Accessories";

const AccessoriesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = accessoriesData.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
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

  const images = product.images || [product.img];

  const similarProducts = accessoriesData
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
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
    if (
      (product.category === "Stockings" ||
        product.category === "Socks") &&
      !selectedSize
    ) {
      alert("Please select size");
      return;
    }

    if (product.category === "Stockings" && !selectedColor) {
      alert("Please select color");
      return;
    }

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    existingCart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: selectedImage,
      qty: quantity,
      size: selectedSize,
      color: selectedColor,
    });

    localStorage.setItem("cart", JSON.stringify(existingCart));
    navigate("/cart");
  };

  const stockingSizes = [
    { label: "S", age: "1 – 2 Years" },
    { label: "M", age: "3 – 4 Years" },
    { label: "L", age: "5 – 6 Years" },
    { label: "XL", age: "6 – 7 Years" },
    { label: "XXL", age: "7 – 9 Years" },
  ];

  const sockSizes = [
    "1 – 2 Years",
    "2 – 3 Years",
    "3 – 4 Years",
    "4 – 5 Years",
  ];

  const stockingColors = ["White", "Black"];

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

          {/* Main Image (Same Zoom System as Shoes) */}
          <div
            onClick={() => setZoomActive(!zoomActive)}
            onMouseMove={handleZoomMove}
            className="w-[700px] h-[700px] bg-white rounded-3xl overflow-hidden cursor-zoom-in"
            style={{
              backgroundImage: zoomActive
                ? `url(${selectedImage})`
                : "none",
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

          {/* Back Button SAME POSITION */}
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
              Perfect comfort for kids. Soft fabric and stretchable fit.
            </p>
          </div>

          {/* STOCKINGS SIZE */}
          {product.category === "Stockings" && (
            <>
              <div>
                <p className="uppercase text-xs tracking-widest text-black/50 mb-6">
                  Choose Size
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {stockingSizes.map((size) => (
                    <button
                      key={size.label}
                      onClick={() =>
                        setSelectedSize(size.label)
                      }
                      className={`p-5 rounded-2xl text-left transition
                      ${selectedSize === size.label
                          ? "bg-[#d8c4b6]"
                          : "bg-white hover:shadow-lg"}`}
                    >
                      <p className="font-semibold text-base">
                        {size.label}
                      </p>
                      <p className="text-xs text-black/50">
                        {size.age}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* COLOR */}
              <div>
                <p className="uppercase text-xs tracking-widest text-black/50 mb-6">
                  Choose Color
                </p>

                <div className="flex gap-5">
                  {stockingColors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        setSelectedColor(color)
                      }
                      className={`px-6 py-3 rounded-full transition
                      ${selectedColor === color
                          ? "bg-[#d8c4b6]"
                          : "bg-white hover:shadow"}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* SOCKS */}
          {product.category === "Socks" && (
            <div>
              <p className="uppercase text-xs tracking-widest text-black/50 mb-6">
                Choose Age
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {sockSizes.map((age) => (
                  <button
                    key={age}
                    onClick={() => setSelectedSize(age)}
                    className={`p-5 rounded-2xl text-left transition
                    ${selectedSize === age
                        ? "bg-[#d8c4b6]"
                        : "bg-white hover:shadow-lg"}`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY */}
          <div className="flex items-center gap-8">
            <button
              onClick={() =>
                quantity > 1 &&
                setQuantity(quantity - 1)
              }
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
              onClick={() =>
                navigate(`/accessories/${item.id}`)
              }
              className="cursor-pointer group"
            >
              <div className="rounded-2xl overflow-hidden mb-4 bg-white shadow-sm group-hover:shadow-xl transition">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <p className="text-base font-medium">
                {item.name}
              </p>
              <p className="text-sm text-black/60">
                ₹{item.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AccessoriesDetails;