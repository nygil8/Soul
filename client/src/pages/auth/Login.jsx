import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdf0e3] text-black">
      {/* Header */}
      <header className="bg-[#f3efe3] py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold tracking-widest">E-KID</h1>
        <div className="flex gap-5 text-xl">
          <span>🔍</span>
          <span>👤</span>
          <span>🛒</span>
        </div>
      </header>

      {/* Login Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-semibold mb-10">Login</h2>

        <form className="w-full max-w-xl space-y-8">
          <input
            type="text"
            placeholder="Username or Email"
            className="w-full border border-black px-4 py-3 bg-transparent focus:outline-none"
          />

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-black px-4 py-3 bg-transparent focus:outline-none"
            />
            <p className="text-sm mt-2 cursor-pointer">Forgot Password?</p>
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-[#b79a89] px-14 py-3 rounded-md font-medium hover:opacity-90 transition"
            >
              Login
            </button>
          </div>
        </form>

        {/* Google Login */}
        <button className="mt-10 flex items-center gap-3 bg-[#4285F4] text-white px-6 py-2 rounded-full shadow">
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
          <a href="/register" className="text-blue-600 font-medium">
            Register
          </a>
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-[#b79a89] py-16 text-center">
        <div className="space-y-6 text-lg">
          <p>Home</p>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>My Account</p>
          <p>Re Fund Policy</p>
          <p>Privacy Policy</p>
          <p>Shipping Policy</p>
        </div>

        <div className="flex justify-center gap-6 mt-10 text-2xl">
          <span>📸</span>
          <span>🌐</span>
        </div>

        <div className="flex justify-end pr-6 mt-6">
          <span className="text-2xl cursor-pointer">⬆</span>
        </div>
      </footer>
    </div>
  );
};

export default Login;
