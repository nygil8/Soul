import { useState, useEffect } from "react";
import Orders from "./Orders";
import Address from "./Address";
import AccountDetails from "./AccountDetails";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.title}>My Account</h2>

        <button
          style={activeTab === "orders" ? styles.activeBtn : styles.btn}
          onClick={() => setActiveTab("orders")}
        >
          🛍 Orders
        </button>

        <button
          style={activeTab === "address" ? styles.activeBtn : styles.btn}
          onClick={() => setActiveTab("address")}
        >
          📍 Address
        </button>

        <button
          style={activeTab === "account" ? styles.activeBtn : styles.btn}
          onClick={() => setActiveTab("account")}
        >
          👤 Account Details
        </button>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* CONTENT */}
      <main style={styles.content}>
        <div style={styles.card}>
          {activeTab === "orders" && <Orders />}
          {activeTab === "address" && <Address />}
          {activeTab === "account" && <AccountDetails />}
        </div>
      </main>
    </div>
  );
};

export default MyAccount;

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f7f1e8",
    fontFamily: "'Inter', sans-serif",
  },

  sidebar: {
    width: "280px",
    background: "#ffffff",
    padding: "28px",
    boxShadow: "8px 0 30px rgba(0,0,0,0.05)",
  },

  title: {
    marginBottom: "30px",
    fontSize: "24px",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },

  btn: {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "12px",
    border: "none",
    background: "#f3ecdf",
    cursor: "pointer",
    textAlign: "left",
    borderRadius: "14px",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },

  activeBtn: {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "12px",
    border: "none",
    background: "#c6ab9a",
    color: "#000",
    cursor: "pointer",
    textAlign: "left",
    borderRadius: "14px",
    fontSize: "14px",
    fontWeight: "500",
  },

  logoutBtn: {
    width: "100%",
    padding: "14px",
    marginTop: "30px",
    border: "none",
    background: "#2b2b2b",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "30px",
    fontSize: "14px",
  },

  content: {
    flex: 1,
    padding: "40px",
  },

  card: {
    background: "#ffffff",
    borderRadius: "30px",
    padding: "32px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.08)",
    minHeight: "420px",
  },
};
