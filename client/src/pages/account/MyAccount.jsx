import { useState, useEffect } from "react";
import Orders from "./Orders";
import Address from "./Address";
import AccountDetails from "./AccountDetails";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={isMobile ? styles.containerMobile : styles.container}>
      
      {/* SIDEBAR */}
      <aside style={isMobile ? styles.sidebarMobile : styles.sidebar}>
        <h2 style={isMobile ? styles.titleMobile : styles.title}>My Account</h2>

        {/* TABS */}
        <div style={isMobile ? styles.tabsMobile : null}>
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
            👤 Account
          </button>
        </div>

        {/* LOGOUT */}
        <button
          style={isMobile ? styles.logoutBtnMobile : styles.logoutBtn}
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      {/* CONTENT */}
      <main style={isMobile ? styles.contentMobile : styles.content}>
        <div style={isMobile ? styles.cardMobile : styles.card}>
          {activeTab === "orders" && <Orders />}
          {activeTab === "address" && <Address />}
          {activeTab === "account" && <AccountDetails />}
        </div>
      </main>
    </div>
  );
};

export default MyAccount;

/* ================= STYLES ================= */

const styles = {
  /* DESKTOP (UNCHANGED) */
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
  },

  activeBtn: {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "12px",
    border: "none",
    background: "#c6ab9a",
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
    minHeight: "420px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.08)",
  },

  /* MOBILE ONLY */
  containerMobile: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    background: "#f7f1e8",
    fontFamily: "'Inter', sans-serif",
  },

  sidebarMobile: {
    background: "#ffffff",
    padding: "16px",
  },

  titleMobile: {
    fontSize: "20px",
    marginBottom: "12px",
  },

  tabsMobile: {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    marginBottom: "14px",
  },

  logoutBtnMobile: {
    width: "100%",
    padding: "14px",
    border: "none",
    background: "#2b2b2b",
    color: "#fff",
    borderRadius: "999px",
    fontSize: "13px",
  },

  contentMobile: {
    padding: "16px",
  },

  cardMobile: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },
};
