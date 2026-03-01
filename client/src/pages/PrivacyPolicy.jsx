import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <section className="px-6 md:px-24 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          
          <h1 className="text-4xl md:text-5xl font-serif mb-8 tracking-wide">
            Privacy Policy
          </h1>

          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            At <span className="font-semibold">E-KID</span>, we are committed to
            protecting your privacy and ensuring that your personal information
            is handled in a safe and responsible manner. This Privacy Policy
            outlines how we collect, use, disclose, and safeguard your
            information when you visit our website or make a purchase from us.
            By accessing or using our website, you agree to the terms described
            in this policy.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            When you place an order or register on our website, we may collect
            personal details such as your name, phone number, email address,
            shipping address, billing address, and payment details. We may also
            collect non-personal information such as browser type, device
            information, and website usage data to improve your shopping
            experience.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Your information is used solely for order processing, shipping,
            customer support, and improving our services. We may use your
            contact details to send order confirmations, delivery updates, and
            important notifications related to your purchase. We do not sell,
            rent, or trade your personal information to third parties for
            marketing purposes.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">
            3. Payment Security
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            All online payments are processed through secure and trusted payment
            gateways. E-KID does not store or have direct access to your debit/
            credit card details or banking credentials. Your payment
            transactions are encrypted and handled with strict security
            standards.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">
            4. Data Protection
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            misuse, alteration, or disclosure. However, while we strive to use
            commercially acceptable means to protect your data, no method of
            transmission over the internet is 100% secure.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">
            5. Third-Party Services
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            We may use trusted third-party partners such as courier services and
            payment gateways to complete your orders. These service providers
            have access only to the information necessary to perform their
            functions and are obligated to protect your data.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">
            6. Cookies
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Our website may use cookies to enhance user experience, analyze
            traffic, and personalize content. You can choose to disable cookies
            through your browser settings; however, some features of the website
            may not function properly if cookies are disabled.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">
            7. Policy Updates
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            E-KID reserves the right to update or modify this Privacy Policy at
            any time without prior notice. Any changes will be reflected on this
            page. We encourage customers to review this policy periodically to
            stay informed.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4">
            8. Contact Us
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            If you have any questions regarding this Privacy Policy or your
            personal information, please contact our customer support team. We
            are always here to assist you and ensure a safe shopping experience
            for you and your child.
          </p>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;