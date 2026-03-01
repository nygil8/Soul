import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Cute Floral Hairband",
      price: 299,
      img: "/assets/product1.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Mini Kids Backpack",
      price: 799,
      img: "/assets/product2.jpg",
      quantity: 2,
    },
  ]);

  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-[#f7f1e8] min-h-screen text-[#2b2b2b]">
      <Navbar />

      <section className="px-6 md:px-24 py-16">
        <h1 className="text-4xl font-serif mb-12">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid lg:grid-cols-3 gap-16">
            
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-10">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-8"
                >
                  
                  {/* PRODUCT INFO */}
                  <div className="flex items-center gap-6">
                    
                    {/* SMALL PRODUCT IMAGE */}
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded-xl"
                    />

                    <div>
                      <h2 className="text-lg font-medium mb-1">
                        {item.name}
                      </h2>

                      <p className="text-base font-semibold mb-3">
                        ₹{item.price}
                      </p>

                      {/* QUANTITY */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 bg-[#eee4d7] rounded-full text-sm"
                        >
                          −
                        </button>

                        <span className="text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 bg-[#eee4d7] rounded-full text-sm"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-500 mt-2 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* ITEM TOTAL */}
                  <div className="text-lg font-semibold">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="bg-white p-8 rounded-3xl shadow-sm h-fit">
              <h2 className="text-2xl font-serif mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4 text-lg">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between mb-6 text-sm text-black/60">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-[#c6ab9a] text-white py-3 rounded-full text-sm hover:opacity-90 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Cart;