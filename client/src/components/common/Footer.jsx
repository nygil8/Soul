import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#b79a89] text-black py-16">
      
      {/* LINKS */}
      <div className="flex flex-col items-center gap-4 text-sm">
        <Link to="/home" className="hover:underline">
          Home
        </Link>

        <Link to="/about" className="hover:underline">
          About Us
        </Link>

        <Link to="/contact" className="hover:underline">
          Contact Us
        </Link>

        <Link to="/my-account">My Account</Link>


        {/* POLICY LINKS – THIS WAS THE ISSUE */}
        <Link to="/refund-policy" className="hover:underline">
          Refund Policy
        </Link>

        <Link to="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>

        <Link to="/shipping-policy" className="hover:underline">
          Shipping Policy
        </Link>
      </div>

      {/* SOCIAL */}
      <div className="flex justify-center gap-6 mt-8 text-xl">
        <span className="cursor-pointer">📸</span>
        <span className="cursor-pointer">🌐</span>
      </div>

      {/* SCROLL TOP */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-right pr-6 mt-6 text-xl cursor-pointer"
      >
        ⬆
      </div>
    </footer>
  );
};

export default Footer;
