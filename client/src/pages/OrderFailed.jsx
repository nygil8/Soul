import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const OrderFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f3e8dc] min-h-screen text-[#2d2d2d]">
      <Navbar />

      <section className="flex items-center justify-center px-6 py-24">
        <div className="bg-white p-12 rounded-3xl shadow-sm text-center max-w-lg w-full">
          
          <div className="text-red-600 text-6xl mb-6">✕</div>

          <h1 className="text-3xl font-serif mb-4">
            Payment Failed
          </h1>

          <p className="text-gray-600 mb-8">
            Something went wrong with your payment.  
            Please try again or choose another payment method.
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/payment")}
              className="bg-[#b18a75] text-white py-3 rounded-full hover:opacity-90 transition"
            >
              Try Again
            </button>

            <button
              onClick={() => navigate("/checkout")}
              className="border border-[#b18a75] text-[#b18a75] py-3 rounded-full hover:bg-[#b18a75] hover:text-white transition"
            >
              Back to Checkout
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrderFailed;