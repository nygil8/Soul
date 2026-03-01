import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useState } from "react";

const Checkout = () => {
  const navigate = useNavigate();

  const [agree, setAgree] = useState(false);


  return (
    <div className="bg-[#f3e8dc] min-h-screen text-[#2d2d2d]">
      <Navbar />

      <section className="px-6 md:px-20 lg:px-32 py-16">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-serif mb-14">
          Payment Process
        </h1>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-16">

          {/* ================= LEFT FORM ================= */}
          <div className="flex-1 space-y-6">

            {/* Name */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="First Name"
                className="p-4 bg-white border border-black/10 rounded-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="p-4 bg-white border border-black/10 rounded-lg focus:outline-none"
              />
            </div>

            {/* Address */}
            <input
              type="text"
              placeholder="House number and street name"
              className="w-full p-4 bg-white border border-black/10 rounded-lg"
            />

            <input
              type="text"
              placeholder="Apartment, suite, unit (optional)"
              className="w-full p-4 bg-white border border-black/10 rounded-lg"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Town / City"
                className="p-4 bg-white border border-black/10 rounded-lg"
              />
              <input
                type="text"
                placeholder="State"
                className="p-4 bg-white border border-black/10 rounded-lg"
              />
            </div>

            <input
              type="text"
              placeholder="Pincode"
              className="w-full p-4 bg-white border border-black/10 rounded-lg"
            />

            <input
              type="text"
              placeholder="Phone"
              className="w-full p-4 bg-white border border-black/10 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full p-4 bg-white border border-black/10 rounded-lg"
            />

          </div>

          {/* 
           RIGHT ORDER SUMMARY  */}

          <div className="lg:w-[420px] bg-[#e8d8c7] p-10 rounded-2xl h-fit shadow-sm">

            <h2 className="text-2xl font-serif mb-8">
              Your Order
            </h2>

            <div className="flex justify-between mb-4">
              <span>Boy’s Cotton Shirt and Pant</span>
              <span>₹ 1,897</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>₹ 1,897</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>Free Shipping</span>
            </div>

            <div className="border-t border-black/20 my-6"></div>

            <div className="flex justify-between text-lg font-semibold mb-8">
              <span>Total</span>
              <span>₹ 1,897</span>
            </div>

            {/* Agreement */}
            <div className="flex items-start gap-3 mb-6 text-sm">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="mt-1"
              />
              <p>
                I have read and agree to the website terms and conditions
              </p>
            </div>

            <button
              disabled={!agree}
              onClick={() => navigate("/payment")}
              className={`w-full py-4 rounded-full text-white text-sm tracking-wide transition 
              ${agree ? "bg-[#b18a75] hover:opacity-90" : "bg-gray-400 cursor-not-allowed"}`}
            >
              Place Order
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;