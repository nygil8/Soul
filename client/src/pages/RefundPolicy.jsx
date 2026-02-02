import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const RefundPolicy = () => {
  return (
    <>
      <Navbar />
      <section className="px-8 md:px-24 py-20 bg-white">
        <h1 className="text-3xl font-serif mb-6">Refund Policy</h1>
        <p className="text-sm text-gray-700 leading-relaxed max-w-3xl">
          If you receive a damaged or incorrect product, please contact us
          within 48 hours of delivery. Eligible items may be exchanged or
          refunded as per our policy. Products must be unused and in original
          packaging to qualify.
        </p>
      </section>
      <Footer />
    </>
  );
};

export default RefundPolicy;
