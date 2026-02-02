import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
// import contactHero from "../assets/contact-hero.jpg";

/* ANIMATION */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 20 },
  },
};

const Contact = () => {
  return (
    <div className="bg-[#f7f1e8] text-[#2b2b2b] overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="px-8 md:px-24 py-20 bg-white">
        <motion.img
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          src={contactHero}
          alt="Contact Us Hero"
          className="w-full rounded-3xl shadow-xl object-cover h-[360px]"
        />

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-4xl md:text-5xl font-serif text-center mt-10"
        >
          Contact Us
        </motion.h1>
      </section>

      {/* CONTENT */}
      <section className="px-8 md:px-24 py-24 bg-white">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="max-w-3xl mx-auto text-center text-sm md:text-base text-gray-700 leading-relaxed mb-10"
        >
          <p>
            We’d love to hear from you! Whether you have questions about our
            products, need help with an order, or just want to share feedback,
            we’re here to help. Our dedicated support team is committed to
            providing fast and friendly service to ensure you have the best
            experience with E-KID.
          </p>
        </motion.div>

        {/* DETAILS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="max-w-xl mx-auto text-sm md:text-base text-gray-700 space-y-4"
        >
          <p><strong>Email:</strong> support@ekidfashion.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> Kerala, India</p>
          <p><strong>Working Hours:</strong> Mon – Sat, 9:30 AM – 6:30 PM</p>
        </motion.div>

        {/* FORM */}
        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="mt-12 max-w-xl mx-auto grid gap-6"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-full px-5 py-3 text-sm focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-full px-5 py-3 text-sm focus:outline-none"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full border border-gray-300 rounded-3xl px-5 py-3 text-sm focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className="bg-[#c6ab9a] px-10 py-3 rounded-full text-sm hover:scale-105 transition"
          >
            Send Message →
          </button>
        </motion.form>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
