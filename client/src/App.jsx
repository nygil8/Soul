import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

/* USER */
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserLogin from "./pages/auth/Login";
import UserRegister from "./pages/auth/Register";
import MyAccount from "./pages/account/MyAccount";
import ShippingPolicy from "./pages/ShippingPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Boys from "./pages/Boys";
import Girls from "./pages/Girls";
import Shoes from "./pages/Shoes";
import Accessories from "./pages/Accessories";
import ProductDetails from "./pages/ProductDetails";
/* ADMIN */
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Overview from "./components/Overview";
import OrderManagement from "./components/dashboard/OrderManagement";
import ProductManagement from "./components/dashboard/ProductManagement";
import CustomerManagement from "./components/dashboard/CustomerManagement";
import ReviewManagement from "./components/dashboard/ReviewManagement";
import Profile from "./components/Profile";


function AnimatedRoutes() {
  const location = useLocations();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* USER  */}
        <Route path="/" element={<Home />} />
        <Route path="/boys" element={<Boys />} />
        <Route path="/girls" element={<Girls />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/Product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-failed" element={<OrderFailed />} />
        <Route path="*" element={<NotFound />} />

        {/* ADMIN */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="reviews" element={<ReviewManagement />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
}

export default App;
