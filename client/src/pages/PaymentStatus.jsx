import { useLocation, useNavigate } from "react-router-dom";

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const success = location.state?.success;
  const paymentId = location.state?.paymentId;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3e8dc]">
      <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
        {success ? (
          <>
            <h1 className="text-3xl font-serif mb-4 text-green-600">
              Payment Successful 🎉
            </h1>
            <p className="mb-4">Payment ID: {paymentId}</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-[#b18a75] text-white px-6 py-3 rounded-full"
            >
              Go to Home
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-serif mb-4 text-red-600">
              Payment Failed ❌
            </h1>
            <button
              onClick={() => navigate("/payment")}
              className="mt-4 bg-[#b18a75] text-white px-6 py-3 rounded-full"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;