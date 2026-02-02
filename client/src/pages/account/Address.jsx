const Address = () => {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* LEFT INFO */}
        <div style={styles.left}>
          <h1 style={styles.title}>Your Address</h1>
          <p style={styles.subtitle}>
            Add or update your billing and shipping address.  
            This helps us deliver your orders safely and on time.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div style={styles.right}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Billing Address</h2>

            <form style={styles.form}>
              <div style={styles.row}>
                <input style={styles.input} placeholder="Full Name" />
                <input style={styles.input} placeholder="Phone Number" />
              </div>

              <input style={styles.input} placeholder="Street Address" />

              <div style={styles.row}>
                <input style={styles.input} placeholder="City" />
                <input style={styles.input} placeholder="State" />
              </div>

              <div style={styles.row}>
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
    gridTemplateColumns: "1fr 1.2fr",
    gap: "60px",
    padding: "60px",
  },

  left: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  title: {
    fontSize: "42px",
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
    padding: "40px",
    borderRadius: "32px",
    boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
  },

  cardTitle: {
    fontSize: "24px",
    marginBottom: "30px",
    fontWeight: "500",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },

  input: {
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #ddd",
    background: "#fafafa",
    fontSize: "14px",
    outline: "none",
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
  },
};
