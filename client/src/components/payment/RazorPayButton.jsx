import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RazorPayButton = ({ amount }) => {
  const navigate = useNavigate();
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleSuccess = (paymentId) => {
    console.log("Payment Success ID:", paymentId);

    // GET CART ITEMS
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // CREATE ORDER OBJECT
    const newOrder = {
      id: Date.now(),
      status: "Paid",
      date: new Date().toLocaleDateString(),
      total: amount,
      paymentId: paymentId,
      items: cartItems
    };

    // GET EXISTING ORDERS
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // SAVE NEW ORDER
    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    // CLEAR CART AFTER SUCCESS
    localStorage.removeItem("cart");

    // NAVIGATE TO SUCCESS PAGE
    navigate("/order-success", {
      state: {
        success: true,
        paymentId: paymentId
      }
    });
  };

  const handlePayment = () => {
    // If no valid Razorpay key is provided, simulate a successful payment for testing purposes.
    if (!razorpayKey || razorpayKey === "YOUR_RAZORPAY_KEY_ID") {
      toast.success("Test Mode: Simulating successful payment...");
      setTimeout(() => {
        handleSuccess(`mock_pay_${Date.now()}`);
      }, 1500);
      return;
    }

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded. Please refresh.");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: amount * 100,
      currency: "INR",
      name: "E-KID",
      description: "Order Payment",
      image: "/logo.png",

      // SUCCESS HANDLER
      handler: function (response) {
        handleSuccess(response.razorpay_payment_id);
      },

      // PAYMENT FAILED
      modal: {
        ondismiss: function () {
          navigate("/order-failed");
        }
      },

      prefill: {
        name: "Customer Name",
        email: "customer@email.com",
        contact: "9999999999"
      },

      theme: {
        color: "#b18a75"
      }
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function () {
      navigate("/order-failed");
    });

    paymentObject.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-[#b18a75] text-white py-4 rounded-full text-sm tracking-wide hover:opacity-90 transition"
    >
      Pay ₹ {amount}
    </button>
  );
};

export default RazorPayButton;