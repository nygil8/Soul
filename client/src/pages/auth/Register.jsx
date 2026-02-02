import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdf0e3] text-gray-900">

      {/* Header */}
      <header className="bg-[#f3efe3] border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-widest">E-KID</h1>
          <nav className="flex gap-6 text-lg">
            <span className="cursor-pointer">🔍</span>
            <span className="cursor-pointer">👤</span>
            <span className="cursor-pointer">🛒</span>
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
              className="w-full mt-4 bg-[#b79a89] py-3 rounded-md font-medium
              hover:opacity-90 transition shadow-md"
            >
              Register
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#b79a89] py-14">
        <div className="max-w-6xl mx-auto text-center space-y-4 text-lg">
          <p>Home</p>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>My Account</p>
          <p>Refund Policy</p>
          <p>Privacy Policy</p>
          <p>Shipping Policy</p>
        </div>

        <div className="flex justify-center gap-6 mt-8 text-2xl">
          <span>📸</span>
          <span>🌐</span>
        </div>
      </footer>
    </div>
  );
};

export default Register;
