import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RazorPayButton = ({ amount }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please refresh.");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: amount * 100,
      currency: "INR",
      name: "E-KID",
      description: "Order Payment",
      image: "/logo.png",

      // SUCCESS HANDLER
      handler: function (response) {
        console.log("Payment Success:", response);

        // GET CART ITEMS
        const cartItems =
          JSON.parse(localStorage.getItem("cart")) || [];

        // CREATE ORDER OBJECT
        const newOrder = {
          id: Date.now(),
          status: "Paid",
          date: new Date().toLocaleDateString(),
          total: amount,
          paymentId: response.razorpay_payment_id,
          items: cartItems
        };

        //  GET EXISTING ORDERS
        const existingOrders =
          JSON.parse(localStorage.getItem("orders")) || [];

        //  SAVE NEW ORDER
        localStorage.setItem(
          "orders",
          JSON.stringify([...existingOrders, newOrder])
        );

        //   CART AFTER SUCCESS
        localStorage.removeItem("cart");

        // NAVIGATE TO SUCCESS PAGE
        navigate("/order-success", {
          state: {
            paymentId: response.razorpay_payment_id
          }
        });
      },

      //  PAYMENT FAILED
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