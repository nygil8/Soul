import { useState, useEffect } from "react";

const AccountDetails = () => {
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
            Account Details
          </h1>

          <p
            style={{
              ...styles.subtitle,
              textAlign: isMobile ? "center" : "left",
              margin: isMobile ? "0 auto" : "0",
            }}
          >
            Update your personal information and change your password
            to keep your account secure.
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
            <h2 style={styles.cardTitle}>Edit Account</h2>

            <form style={styles.form}>
              {/* Name + Email Row */}
              <div
                style={{
                  ...styles.row,
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                }}
              >
                <input
                  style={styles.input}
                  placeholder="Full Name"
                  type="text"
                />

                {/* ✅ Editable Email */}
                <input
                  style={styles.input}
                  placeholder="Email"
                  type="email"
                />
              </div>

              <input
                style={styles.input}
                placeholder="New Password"
                type="password"
              />

              <button
                style={styles.button}
                type="submit"
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#cc001f")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "#e60023")
                }
              >
                Update Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;

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
    color: "#333",
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
    color: "#111",
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
    background: "#e60023",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
    width: "100%",
  },
};