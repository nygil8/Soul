import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf0e3] text-black">
      
      {/* Header */}
      <header className="bg-[#f3efe3] py-4 px-6 flex justify-between items-center">
        <h1 
          onClick={() => navigate("/")}
          className="text-xl font-semibold tracking-widest cursor-pointer"
        >
          E-KID
        </h1>
        <div className="flex gap-5 text-xl">
          <span className="cursor-pointer">🔍</span>
          <span 
            onClick={() => navigate("/login")}
            className="cursor-pointer"
          >
            👤
          </span>
          <span 
            onClick={() => navigate("/cart")}
            className="cursor-pointer"
          >
            🛒
          </span>
        </div>
      </header>

      {/* Login Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-semibold mb-10">Login</h2>

        {/* Error Display Removed - using toast */}

        <form className="w-full max-w-xl space-y-8" onSubmit={onSubmit}>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Username or Email"
            className="w-full border border-black px-4 py-3 bg-transparent focus:outline-none"
            required
          />

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Password"
              className="w-full border border-black px-4 py-3 bg-transparent focus:outline-none"
              required
            />
            <p className="text-sm mt-2 cursor-pointer hover:underline">
              Forgot Password?
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-[#b79a89] px-14 py-3 rounded-md font-medium hover:opacity-90 transition text-white"
            >
              Login
            </button>
          </div>
        </form>

        {/* Google Login */}
        <button className="mt-10 flex items-center gap-3 bg-[#4285F4] text-white px-6 py-2 rounded-full shadow hover:opacity-90 transition">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google"
            className="w-5 h-5 bg-white rounded-full p-1"
          />
          Sign in with Google
        </button>

        {/* Register */}
        <p className="mt-8">
          Not a member?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-[#b79a89] py-16 text-center text-white">
        <div className="space-y-6 text-lg">

          <Link to="/" className="block hover:underline">
            Home
          </Link>

          <Link to="/about" className="block hover:underline">
            About Us
          </Link>

          <Link to="/contact" className="block hover:underline">
            Contact Us
          </Link>

          <Link to="/my-account" className="block hover:underline">
            My Account
          </Link>

          <Link to="/refund-policy" className="block hover:underline">
            Refund Policy
          </Link>

          <Link to="/privacy-policy" className="block hover:underline">
            Privacy Policy
          </Link>

          <Link to="/shipping-policy" className="block hover:underline">
            Shipping Policy
          </Link>

        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-10 text-2xl">
          <span className="cursor-pointer">📸</span>
          <span className="cursor-pointer">🌐</span>
        </div>

        {/* Scroll To Top */}
        <div className="flex justify-end pr-6 mt-6">
          <span
            onClick={scrollToTop}
            className="text-2xl cursor-pointer hover:scale-110 transition"
          >
            ⬆
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Login;