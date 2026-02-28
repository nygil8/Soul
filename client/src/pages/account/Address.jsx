import { useState, useEffect } from "react";

const Address = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.container,
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr",
          padding: isMobile ? "20px" : "60px",
          gap: isMobile ? "30px" : "60px",
        }}
      >
        {/* LEFT INFO */}
        <div style={styles.left}>
          <h1
            style={{
              ...styles.title,
              fontSize: isMobile ? "28px" : "42px",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Your Address
          </h1>

          <p
            style={{
              ...styles.subtitle,
              textAlign: isMobile ? "center" : "left",
              margin: isMobile ? "0 auto" : "0",
            }}
          >
            Add or update your billing and shipping address.
            This helps us deliver your orders safely and on time.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div style={styles.right}>
          <div
            style={{
              ...styles.card,
              padding: isMobile ? "25px" : "40px",
              borderRadius: isMobile ? "20px" : "32px",
            }}
          >
            <h2 style={styles.cardTitle}>Billing Address</h2>

            <form style={styles.form}>
              {/* Row 1 */}
              <div
                style={{
                  ...styles.row,
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                }}
              >
                <input style={styles.input} placeholder="Full Name" />
                <input style={styles.input} placeholder="Phone Number" />
              </div>

              <input style={styles.input} placeholder="Street Address" />

              {/* Row 2 */}
              <div
                style={{
                  ...styles.row,
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                }}
              >
                <input style={styles.input} placeholder="City" />
                <input style={styles.input} placeholder="State" />
              </div>

              {/* Row 3 */}
              <div
                style={{
                  ...styles.row,
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                }}
              >
                <input style={styles.input} placeholder="Pincode" />
                <input style={styles.input} placeholder="Country" />
              </div>

              <button style={styles.button}>Save Address</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f7f1e8, #efe6d8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, sans-serif",
  },

  container: {
    width: "100%",
    maxWidth: "1200px",
    display: "grid",
  },

  left: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  title: {
    fontWeight: "600",
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "15px",
    color: "#555",
    maxWidth: "420px",
    lineHeight: "1.7",
  },

  right: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "100%",
    background: "#fff",
    boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
  },

  cardTitle: {
    fontSize: "22px",
    marginBottom: "25px",
    fontWeight: "500",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  row: {
    display: "grid",
    gap: "16px",
  },

  input: {
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #ddd",
    background: "#fafafa",
    fontSize: "14px",
    outline: "none",
    width: "100%",
  },

  button: {
    marginTop: "10px",
    padding: "15px",
    borderRadius: "999px",
    border: "none",
    background: "#2b2b2b",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    width: "100%",
  },
};