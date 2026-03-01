import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf0e3] text-gray-900">

      {/* Header */}
      <header className="bg-[#f3efe3] border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1
            onClick={() => navigate("/")}
            className="text-xl font-semibold tracking-widest cursor-pointer"
          >
            E-KID
          </h1>

          <nav className="flex gap-6 text-lg">
            <span
              onClick={() => navigate("/search")}
              className="cursor-pointer"
            >
              🔍
            </span>

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
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl px-10 py-12">

          <h2 className="text-3xl font-semibold text-center mb-2">
            Create Account
          </h2>

          <p className="text-center text-sm text-gray-600 mb-10">
            Join E-KID to explore the latest kids fashion
          </p>

          <form className="space-y-6">

            {/* Username */}
            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                required
                placeholder="Enter your username"
                className="w-full border border-gray-400 rounded-md px-4 py-3 bg-transparent
                focus:outline-none focus:ring-2 focus:ring-[#b79a89]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                placeholder="Enter your email"
                className="w-full border border-gray-400 rounded-md px-4 py-3 bg-transparent
                focus:outline-none focus:ring-2 focus:ring-[#b79a89]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                minLength="6"
                placeholder="Create a password"
                className="w-full border border-gray-400 rounded-md px-4 py-3 bg-transparent
                focus:outline-none focus:ring-2 focus:ring-[#b79a89]"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                required
                placeholder="Re-enter password"
                className="w-full border border-gray-400 rounded-md px-4 py-3 bg-transparent
                focus:outline-none focus:ring-2 focus:ring-[#b79a89]"
              />
            </div>

            {/* Login Link */}
            <p className="text-sm text-right">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-medium">
                Login
              </Link>
            </p>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-4 bg-[#b79a89] py-3 rounded-md font-medium text-white
              hover:opacity-90 transition shadow-md ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>

          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#b79a89] py-14">

        <div className="max-w-6xl mx-auto text-center space-y-4 text-lg">

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
        <div className="flex justify-center gap-6 mt-8 text-2xl">
          <span className="cursor-pointer">📸</span>
          <span className="cursor-pointer">🌐</span>
        </div>

        {/* Scroll Top */}
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

export default Register;