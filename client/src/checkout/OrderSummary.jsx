import { useNavigate } from "react-router-dom";
import { useState } from "react";

const OrderSummary = () => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);

  const subtotal = 1897;

  return (
    <div className="bg-[#e8d8c7] p-10 rounded-2xl h-fit shadow-sm">

      <h2 className="text-2xl font-serif mb-8">
        Your Order
      </h2>

      <div className="flex justify-between mb-4">
        <span>Boy’s Cotton Shirt and Pant</span>
        <span>₹ {subtotal}</span>
      </div>

      <div className="flex justify-between mb-4">
        <span>Subtotal</span>
        <span>₹ {subtotal}</span>
      </div>

      <div className="flex justify-between mb-4">
        <span>Shipping</span>
        <span>Free Shipping</span>
      </div>

      <div className="border-t border-black/20 my-6"></div>

      <div className="flex justify-between text-lg font-semibold mb-8">
        <span>Total</span>
        <span>₹ {subtotal}</span>
      </div>

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
  );
};

export default OrderSummary;