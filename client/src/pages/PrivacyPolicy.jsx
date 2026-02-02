import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <section className="px-8 md:px-24 py-20 bg-white">
        <h1 className="text-3xl font-serif mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-700 leading-relaxed max-w-3xl">
          E-KID values your privacy. All personal information shared with us is
          securely stored and used only for order processing and customer
          support. We do not sell, trade, or share customer data with third
          parties except where required by law.
        </p>
      </section>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
