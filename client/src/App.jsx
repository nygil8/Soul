import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Overview from './components/Overview';
import OrderManagement from './components/dashboard/OrderManagement';
import ProductManagement from './components/dashboard/ProductManagement';
import CustomerManagement from './components/dashboard/CustomerManagement';
import ReviewManagement from './components/dashboard/ReviewManagement';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
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
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  )
}

export default App
