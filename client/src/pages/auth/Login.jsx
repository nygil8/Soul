import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  // const [error, setError] = useState(''); // Removed in favor of toast
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type === 'text' || e.target.type === 'email' ? 'email' : 'password']: e.target.value });
  };
  // Note: The input for username/email has type="text" but we map it to 'email' in state for simplicity, 
  // or we need to handle both. The backend likely expects 'email' or 'username'.
  // Looking at authController (Step 269), it checks { $or: [{ email }, { username }] }. 
  // So we can send 'email' prop with the value, even if it's a username.

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // API call same as Admin Login
      const res = await api.post('/auth/login', formData);
      console.log('DEBUG: Full Login Response:', res); // Log the full response object
      console.log('DEBUG: Response Data:', res.data); // Log just the data

      if (!res.data || !res.data.user) {
        console.error('CRITICAL: User data missing in response!', res);
        throw new Error('Server response missing user data');
      }

      // Filter PII for storage
      const userForStorage = {
        id: res.data.user.id,
        username: res.data.user.username,
        role: res.data.user.role,
        profilePhoto: res.data.user.profilePhoto
      };
      localStorage.setItem('user', JSON.stringify(userForStorage));

      toast.success("Welcome back!");
      // Redirect based on role
      if (res.data.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/'); // Redirect users to home
      }

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf0e3] text-black">
      {/* Header */}
      <header className="bg-[#f3efe3] py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold tracking-widest cursor-pointer" onClick={() => navigate('/')}>E-KID</h1>
        <div className="flex gap-5 text-xl">
          <span>🔍</span>
          <span>👤</span>
          <span>🛒</span>
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
            <p className="text-sm mt-2 cursor-pointer">Forgot Password?</p>
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
        <button className="mt-10 flex items-center gap-3 bg-[#4285F4] text-white px-6 py-2 rounded-full shadow hover:opacity-90">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google"
            className="w-5 h-5 bg-white rounded-full p-1"
          />
          Sign in with Google
        </button>

        {/* Register */}
        <p className="mt-8">
          Not a member ?{" "}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </a>
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-[#b79a89] py-16 text-center text-white">
        <div className="space-y-6 text-lg">
          <p className="cursor-pointer hover:underline">Home</p>
          <p className="cursor-pointer hover:underline">About Us</p>
          <p className="cursor-pointer hover:underline">Contact Us</p>
          <p className="cursor-pointer hover:underline">My Account</p>
          <p className="cursor-pointer hover:underline">Refund Policy</p>
          <p className="cursor-pointer hover:underline">Privacy Policy</p>
          <p className="cursor-pointer hover:underline">Shipping Policy</p>
        </div>

        <div className="flex justify-center gap-6 mt-10 text-2xl">
          <span className="cursor-pointer">📸</span>
          <span className="cursor-pointer">🌐</span>
        </div>

        <div className="flex justify-end pr-6 mt-6">
          <span className="text-2xl cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>⬆</span>
        </div>
      </footer>
    </div>
  );
};

export default Login;
