import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const ShippingPolicy = () => {
  return (
    <>
      <Navbar />
      <section className="px-8 md:px-24 py-20 bg-white">
        <h1 className="text-3xl font-serif mb-6">Shipping Policy</h1>
        <p className="text-sm text-gray-700 leading-relaxed max-w-3xl">
          At E-KID, we ensure safe and timely delivery of all orders. Orders are
          processed within 1–3 business days and shipped via trusted courier
          partners across India. Delivery timelines may vary based on location,
          weather, or unforeseen conditions. Tracking details will be shared
          once your order is dispatched.
        </p>
      </section>
      <Footer />
    </>
  );
};

export default ShippingPolicy;
