import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import aboutHero from "../assets/about-hero.jpg";

/* ANIMATION */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 20 },
  },
};

const About = () => {
  return (
    <div className="bg-[#f7f1e8] text-[#2b2b2b] overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="px-8 md:px-24 py-20 bg-white">
        <motion.img
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          src={aboutHero}
          alt="About Us Hero"
          className="w-full rounded-3xl shadow-xl object-cover h-[360px]"
        />

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-4xl md:text-5xl font-serif text-center mt-10"
        >
          About E-KID
        </motion.h1>
      </section>

      {/* CONTENT */}
      <section className="px-8 md:px-24 py-24 bg-white">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="max-w-3xl mx-auto text-center text-sm md:text-base text-gray-700 leading-relaxed"
        >
          <p className="mb-4">
            Welcome to <strong>E-KID</strong> — where comfort meets creativity
            for your little treasures. We believe every child deserves clothing
            that allows them to play, explore, and express themselves freely.
            Our curated collections are thoughtfully designed to blend soft,
            skin-friendly fabrics with timeless style and thoughtful
            craftsmanship.
          </p>

          <p className="mb-4">
            Founded with a passion for quality and comfort, E-KID aims to
            deliver clothing that adapts to your child’s everyday life —
            from playful mornings to cozy evenings. Each piece in our collection
            reflects our commitment to durability, ease of wear, and joyful
            design that parents trust and kids love.
          </p>

          <p>
            We believe that fashion shouldn’t compromise comfort. Our mission
            is to offer exceptional kidswear that embraces both functionality
            and beauty. Thank you for choosing E-KID — where every outfit tells
            a story of love, care, and confidence.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
