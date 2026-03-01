import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>My Orders</h2>

      {orders.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.icon}>📦</div>
          <h3 style={styles.emptyTitle}>No orders yet</h3>
          <p style={styles.emptyText}>
            You haven’t placed any orders yet. Once you do, they’ll appear here
            with full details.
          </p>
          <Link to="/" style={{ ...styles.viewBtn, marginTop: '20px', display: 'inline-block' }}>Start Shopping</Link>
        </div>
      ) : (
        <div style={styles.grid}>
          {orders.map((order) => (
            <div key={order.id} style={styles.card}>
              
              {/* Header */}
              <div style={styles.cardHeader}>
                <span style={styles.orderId}>
                  Order #{order.id}
                </span>
                <span style={styles.status}>
                  {order.status}
                </span>
              </div>

              {/* Body */}
              <div style={styles.cardBody}>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Payment ID:</strong> {order.paymentId}</p>
                <p><strong>Total:</strong> ₹{order.total}</p>

                {/* Ordered Items */}
                <div style={{ marginTop: "12px" }}>
                  {order.items && order.items.map((item, index) => (
                    <div key={index} style={styles.itemRow}>
                      <span>{item.name}</span>
                      <span>
                        {item.qty} × ₹{item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button style={styles.viewBtn}>
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;


/* ================= STYLES ================= */

const styles = {
  wrapper: {
    width: "100%",
    minHeight: "100vh",
    padding: "40px 20px",
    background: "linear-gradient(135deg, #f7f1e8, #efe6d8)",
    fontFamily: "Inter, sans-serif",
  },

  heading: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "30px",
  },

  emptyState: {
    background: "#f3ecdf",
    borderRadius: "24px",
    padding: "60px 30px",
    textAlign: "center",
  },

  icon: {
    fontSize: "48px",
    marginBottom: "16px",
  },

  emptyTitle: {
    fontSize: "20px",
    marginBottom: "8px",
  },

  emptyText: {
    fontSize: "14px",
    color: "#555",
    maxWidth: "420px",
    margin: "0 auto",
    lineHeight: "1.6",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
  },

  orderId: {
    fontSize: "14px",
    fontWeight: "500",
  },

  status: {
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "20px",
    background: "#c6ab9a",
  },

  cardBody: {
    fontSize: "13px",
    lineHeight: "1.6",
    marginBottom: "16px",
  },

  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    marginTop: "6px",
    borderBottom: "1px solid #eee",
    paddingBottom: "4px",
  },

  viewBtn: {
    border: "none",
    padding: "10px",
    borderRadius: "20px",
    background: "#2b2b2b",
    color: "#fff",
    cursor: "pointer",
    fontSize: "13px",
  },
};