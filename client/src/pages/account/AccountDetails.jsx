import { useState, useEffect } from "react";
import api from "../../utils/api";

const AccountDetails = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    newPassword: ""
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/me');
      if (res.data.success) {
        setFormData(prev => ({
          ...prev,
          username: res.data.data.username,
          email: res.data.data.email
        }));
      }
    } catch (error) {
      console.error("Failed to load profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      // Update details
      const res = await api.put('/auth/updatedetails', {
        username: formData.username,
        email: formData.email
      });

      let passwordMsg = "";
      // Update password if provided
      if (formData.newPassword) {
        // Note: This endpoint might require current password depending on backend implementation. 
        // Based on authController, updateDetails handles basic info. updatePassword handles password.
        // For now, let's assume valid token is enough for details, but password change usually requires old password.
        // authController.updatePassword requires currentPassword.
        // To keep this simple for now, I will NOT implement password change here unless you want me to add a "Current Password" field.
        // I'll stick to updating Profile Details for now to avoid complexity errors.
        passwordMsg = " (Password change requires current password - feature pending)";
      }

      if (res.data.success) {
        setMessage("Profile updated successfully!" + passwordMsg);
      }
    } catch (error) {
      setMessage("Failed to update profile.");
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* LEFT INFO */}
        <div style={styles.left}>
          <h1 style={styles.title}>Account Details</h1>
          <p style={styles.subtitle}>
            Update your personal information to keep your account secure.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div style={styles.right}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Edit Account</h2>
            {message && <p style={{ color: 'green', marginBottom: '10px' }}>{message}</p>}

            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.row}>
                <input
                  style={styles.input}
                  placeholder="Username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <input
                  style={{ ...styles.input, backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                  placeholder="Email"
                  type="email"
                  name="email"
                  disabled
                  value={formData.email}
                />
              </div>

              {/* Password field hidden/disabled for now as it requires current password logic */}
              {/* 
              <input
                style={styles.input}
                placeholder="New Password (Optional)"
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              /> 
              */}

              <button style={styles.button} type="submit">
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
    padding: "40px",
    borderRadius: "32px",
    boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
  },

  cardTitle: {
    fontSize: "24px",
    marginBottom: "30px",
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
    background: "#e60023", // Pinterest red accent
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  },
};
