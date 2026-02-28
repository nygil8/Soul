import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


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
import ClothingDetails from "./pages/ClothingDetails";
import ShoesDetails from "./pages/ShoesDetails";
import AccessoriesDetails from "./pages/AccessoriesDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/CheckOut";
import Payment from "./pages/Payment";
import PaymentStatus from "./pages/PaymentStatus";
import OrderSuccess from "./pages/OrderSuccess";
import OrderFailed from "./pages/OrderFailed";
import NotFound from "./pages/NotFound";

/* ADMIN */
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Overview from "./components/Overview";
import OrderManagement from "./components/dashboard/OrderManagement";
import ProductManagement from "./components/dashboard/ProductManagement";
import CustomerManagement from "./components/dashboard/CustomerManagement";
import ReviewManagement from "./components/dashboard/ReviewManagement";
import Profile from "./components/Profile";


function App() {
  return (
    <Router>
      <Routes>
        {/* USER  */}
        <Route path="/" element={<Home />} />
        <Route path="/boys" element={<Boys />} />
        <Route path="/girls" element={<Girls />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/Product/:id" element={<ClothingDetails />} />
        <Route path="/shoes/:age/:id" element={<ShoesDetails />} />
        <Route path="/accessories/:id" element={<AccessoriesDetails />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/payment-status" element={<PaymentStatus/>}/>
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
    </Router>
  );
}

export default App;
