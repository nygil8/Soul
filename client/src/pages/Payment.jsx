import Navbar from "../components/common/Navbar";
import RazorPayButton from "../components/payment/RazorPayButton";
import PaymentMethods from "../components/payment/PaymentMethods";
import SecureMethod from "../components/payment/SecureMethod";

const Payment = () => {
  const totalAmount = 1897;

  return (
    <div className="bg-[#f3e8dc] min-h-screen text-[#2d2d2d]">
      <Navbar />

      <section className="px-6 md:px-20 lg:px-32 py-20">
        <h1 className="text-4xl md:text-5xl font-serif mb-14">
          Complete Your Payment
        </h1>

        <div className="flex flex-col lg:flex-row gap-16">

          {/* LEFT */}
          <div className="flex-1 bg-white p-10 rounded-2xl shadow-sm">
            <PaymentMethods />
            <SecureMethod />
          </div>

          {/* RIGHT */}
          <div className="lg:w-[420px] bg-[#e8d8c7] p-10 rounded-2xl shadow-sm h-fit">
            <h2 className="text-2xl font-serif mb-8">Order Summary</h2>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>₹ {totalAmount}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="border-t border-black/20 my-6"></div>

            <div className="flex justify-between text-lg font-semibold mb-8">
              <span>Total</span>
              <span>₹ {totalAmount}</span>
            </div>

            <RazorPayButton amount={totalAmount} />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Payment;