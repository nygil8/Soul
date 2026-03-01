import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f3e8dc] min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        
        <h1 className="text-7xl font-serif mb-6">
          404
        </h1>

        <p className="text-gray-600 mb-8">
          The page you’re looking for doesn’t exist.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-[#b18a75] text-white px-8 py-3 rounded-full hover:opacity-90 transition"
        >
          Go Back Home
        </button>

      </div>
    </div>
  );
};

export default NotFound;