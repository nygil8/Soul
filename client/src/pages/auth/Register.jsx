import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { username, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/register", formData);
      if (res.data.success) {
        // Save user data (Token is handled by cookie usually, but we also save user info)
        localStorage.setItem('user', JSON.stringify(res.data.user));

        // Redirect to home
        navigate("/");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf0e3] text-gray-900">

      {/* Header */}
      <header className="bg-[#f3efe3] border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold tracking-widest">E-KID</Link>
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

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={onSubmit}>
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
