import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between px-8 py-5 bg-[#f3ecdf]">
      
      {/* MENU */}
      <button onClick={() => setOpen(!open)} className="text-2xl">
        ☰
      </button>

      {/* LOGO */}
      <Link to="/" className="text-xl font-serif tracking-widest">
        E-KID
      </Link>

      {/* ICONS */}
      <div className="flex gap-5 text-xl">
        <Link to="/search" aria-label="Search">
          🔍
        </Link>
        <Link to="/login" aria-label="User Account">
          👤
        </Link>
        <Link to="/cart" aria-label="Shopping Cart">
          🛒
        </Link>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-[#f3ecdf] shadow-lg z-50">
          <nav className="flex flex-col items-center gap-6 py-10">

            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact Us</Link>
            <Link to="/my-account" onClick={() => setOpen(false)}>My Account</Link>

            <div className="w-24 h-px bg-black/30 my-4" />

            {/* POLICY LINKS */}
            <Link to="/shipping-policy" onClick={() => setOpen(false)}>
              Shipping Policy
            </Link>

            <Link to="/privacy-policy" onClick={() => setOpen(false)}>
              Privacy Policy
            </Link>

            <Link to="/refund-policy" onClick={() => setOpen(false)}>
              Refund Policy
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
