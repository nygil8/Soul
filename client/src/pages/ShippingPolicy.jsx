import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const ShippingPolicy = () => {
  return (
    <>
      <Navbar />

      <section className="bg-[#f7f1e8] px-6 md:px-24 py-20 text-[#2b2b2b]">
        
        <div className="max-w-4xl">
          
          <h1 className="text-4xl font-serif mb-10">
            Shipping Policy
          </h1>

          <p className="text-base leading-relaxed mb-6">
            At <span className="font-semibold">E-KID</span>, we are committed to delivering your child’s
            favorite styles safely and on time. All orders are carefully processed
            within <span className="font-medium">1–3 business days</span> after confirmation.
            Once dispatched, your package will be shipped through our trusted
            logistics partner <span className="font-medium">DTDC Courier Service</span>,
            ensuring secure handling and reliable delivery across India.
          </p>

          <p className="text-base leading-relaxed mb-6">
            Standard delivery timelines are approximately 
            <span className="font-medium"> 5–7 working days</span>, depending on your
            location. Delivery to remote areas may take slightly longer.
            Please note that shipping timelines may vary due to public holidays,
            weather conditions, or unforeseen logistical delays.
          </p>

          <p className="text-base leading-relaxed mb-6">
            Once your order has been dispatched, you will receive tracking
            details via SMS or email, allowing you to monitor your shipment
            in real time. We kindly request customers to ensure accurate
            shipping information at checkout to avoid delivery delays.
          </p>

          <p className="text-base leading-relaxed">
            If you experience any issues regarding your shipment or need
            assistance, our support team is always ready to help. At E-KID,
            your satisfaction and your child’s happiness are our top priorities.
          </p>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default ShippingPolicy;
