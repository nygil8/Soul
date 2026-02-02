import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

/* ASSETS */
import heroImg from "../assets/hero.jpg";
import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";
import product4 from "../assets/product4.jpg";
import whyImg from "../assets/why.jpg";
import aboutImg from "../assets/about.jpg";

/* ANIMATIONS */
const smoothFadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 20 },
  },
};

const smoothLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 65, damping: 22 },
  },
};

const smoothRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 65, damping: 22 },
  },
};

const staggerSoft = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

/* HOME */
const Home = () => {
  return (
    <div className="bg-[#f7f1e8] text-[#2b2b2b] overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="grid md:grid-cols-2 items-center px-8 md:px-24 py-20 gap-16">
        <motion.div
          variants={staggerSoft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="space-y-6"
        >
          <motion.h1
            variants={smoothFadeUp}
            className="text-3xl md:text-5xl font-serif leading-snug"
          >
            " Timeless styles <br /> for tiny treasures "
          </motion.h1>

          <motion.p
            variants={smoothFadeUp}
            className="text-sm max-w-md text-gray-700"
          >
            Discover soft, stylish, and comfortable outfits crafted with love
            for your little ones.
          </motion.p>

          <motion.button
            variants={smoothFadeUp}
            whileHover={{ scale: 1.05 }}
            className="bg-[#c6ab9a] px-8 py-3 rounded-full text-sm"
          >
            Shop Now →
          </motion.button>
        </motion.div>

        <motion.img
          variants={smoothRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          src={heroImg}
          alt="Hero"
          className="rounded-3xl shadow-xl w-full object-cover"
        />
      </section>

      {/* PRODUCTS */}
      <section className="px-8 md:px-24 py-24 bg-[#f3ecdf]">
        <motion.h2
          variants={smoothFadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-center text-3xl font-serif mb-16"
        >
          All Products
        </motion.h2>

        <motion.div
          variants={staggerSoft}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-10"
        >
          {[product1, product2, product3, product4].map((img, i) => (
            <motion.div
              key={i}
              variants={smoothFadeUp}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-4 shadow-md"
            >
              <img
                src={img}
                alt="Product"
                className="h-44 w-full object-cover rounded-xl"
              />
              <button className="mt-4 w-full bg-[#c6ab9a] py-2 rounded-full text-sm">
                View
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-8 md:px-24 py-28 bg-white">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            variants={smoothLeft}
            initial="hidden"
            whileInView="visible"
            className="bg-[#f3ecdf] p-12 rounded-3xl shadow-lg"
          >
            <h3 className="text-3xl font-serif mb-6">Why Choose Us?</h3>
            <p className="text-sm leading-relaxed text-gray-700">
            At E-KID, we believe children’s clothing should be as gentle as a parent’s care and as strong as a child’s spirit.
            Every piece we create is thoughtfully designed using premium, skin-friendly fabrics that are safe, breathable, and comfortable for all-day wear.
            Our focus goes beyond style — we prioritize softness, durability, and perfect fitting so your child can move freely, play confidently, and feel happy in every moment. With timeless designs and careful craftsmanship, 
            we ensure that each outfit reflects quality, trust, and love, making E-KID a brand parents can rely on
            </p>
          </motion.div>

          <motion.img
            variants={smoothRight}
            initial="hidden"
            whileInView="visible"
            src={whyImg}
            alt="Why Choose Us"
            className="rounded-3xl shadow-xl w-full object-cover"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 md:px-24 py-24 bg-[#f7f1e8]">
        <motion.div
          variants={staggerSoft}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-3 gap-16 text-center"
        >
          {["🌸 Quality", "👕 Style", "🍃 Organic"].map((item, i) => (
            <motion.div key={i} variants={smoothFadeUp}>
              <h4 className="text-xl font-serif">{item}</h4>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ABOUT */}
      <section className="px-8 md:px-24 py-28 bg-white">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.img
            variants={smoothLeft}
            initial="hidden"
            whileInView="visible"
            src={aboutImg}
            alt="About"
            className="rounded-3xl shadow-xl w-full object-cover"
          />

          <motion.div
            variants={smoothRight}
            initial="hidden"
            whileInView="visible"
            className="bg-[#f3ecdf] p-12 rounded-3xl"
          >
            <h3 className="text-3xl font-serif mb-6">About Us</h3>
            <p className="text-sm text-gray-700">
             E-KID is a premium kids fashion brand dedicated to creating clothing that combines comfort, safety, and modern elegance. We understand that childhood is a time of exploration and growth, which is why our collections are designed to support active lifestyles while maintaining a stylish appearance. From fabric selection to final stitching, every detail is handled with care to deliver high-quality garments that parents trust and children love. Our mission is to provide clothing that grows with your child, celebrates joyful moments, and brings confidence and comfort to every stage of childhood.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
