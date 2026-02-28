import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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

const Home = () => {
  const scrollToCategories = () => {
    document
      .getElementById("categories")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#f7f1e8] text-[#2b2b2b] overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="grid md:grid-cols-2 items-center px-8 md:px-24 py-20 gap-16">
        <motion.div
          variants={staggerSoft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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

          {/* SHOP NOW → SCROLL */}
          <motion.button
            variants={smoothFadeUp}
            onClick={scrollToCategories}
            className="bg-[#c6ab9a] px-8 py-3 rounded-full text-sm hover:scale-105 transition"
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

      {/* CATEGORIES */}
      <section
        id="categories"
        className="px-8 md:px-24 py-24 bg-[#f3ecdf]"
      >
        <motion.h2
          variants={smoothFadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-center text-3xl font-serif mb-16"
        >
          Shop by Category
        </motion.h2>

        <motion.div
          variants={staggerSoft}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-10"
        >
          {[
            { img: product1, link: "/boys", label: "boys" },
            { img: product2, link: "/girls", label: "girls" },
            { img: product3, link: "/shoes", label: "Shoes" },
            { img: product4, link: "/accessories", label: "Accessories" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={smoothFadeUp}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-4 shadow-md"
            >
              <img
                src={item.img}
                alt={item.label}
                className="h-44 w-full object-cover rounded-xl"
              />

              <Link
                to={item.link}
                className="mt-4 block text-center bg-[#c6ab9a] py-2 rounded-full text-sm"
              >
                View {item.label}
              </Link>
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
              At E-KID, we design children’s clothing with the same care a parent
              gives their child. Premium fabrics, comfort-first design, and
              durability define every piece we create.
            </p>
          </motion.div>

          <motion.img
  variants={smoothRight}
  initial="hidden"
  whileInView="visible"
  src={whyImg}
  alt="Why Choose Us"
  className="rounded-3xl shadow-xl w-full md:w-[80%] md:mx-auto object-cover"
/>
        </div>
      </section>

      {/* WHY BUY FROM US */}
      <section className="px-8 md:px-24 py-28 bg-white">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.img
            variants={smoothLeft}
            initial="hidden"
            whileInView="visible"
            src={aboutImg}
            alt="Why Buy From Us"
            className="rounded-3xl shadow-xl w-full object-cover"
          />

          <motion.div
            variants={smoothRight}
            initial="hidden"
            whileInView="visible"
            className="bg-[#f3ecdf] p-12 rounded-3xl"
          >
            <h3 className="text-3xl font-serif mb-6">Why Buy From Us</h3>
            <p className="text-sm text-gray-700">
              Parents trust E-KID for quality, kids love us for comfort.
              Every outfit is crafted to support movement, play, and joyful
              childhood moments.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
