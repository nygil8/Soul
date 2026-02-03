import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import productImg from "../assets/product1.jpg";

/* 🔹 ADMIN / BACKEND VALUE */
const productType = "top"; 
// "top" → shirts, combos, jackets (90–160)
// "bottom" → jeans, pants (S–XL)

/* SIZE LOGIC */
const getSizes = (ageGroup) => {
  if (ageGroup === "2-6") {
    return productType === "top"
      ? ["90", "100", "110", "120", "130", "140", "150", "160"]
      : ["S", "M", "L", "XL"];
  }

  if (ageGroup === "0-2") return ["XS", "S", "M", "L", "XL"];
  if (ageGroup === "7-12") return ["S", "M", "L", "XL"];
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate

  const [ageGroup, setAgeGroup] = useState("2-6");
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  const inStock = true;

  // Handler to navigate to cart page
  const handleAddToCart = () => {
    if (!size || !inStock) return; // Safety check
    navigate("/cart"); // Navigate to Cart page
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <section style={styles.container}>
        {/* IMAGE */}
        <div style={styles.imageWrap}>
          <img src={productImg} alt="Product" style={styles.image} />

          <span
            style={{
              ...styles.stockBadge,
              background: inStock ? "#2b2b2b" : "#999",
            }}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* DETAILS */}
        <div style={styles.details}>
          <h1 style={styles.title}>Premium Korean Kids Wear</h1>

          <p style={styles.desc}>
            Imported Korean fabric with premium stitching.
            Designed for comfort and daily wear.
          </p>

          {/* AGE GROUP */}
          <div style={styles.block}>
            <p style={styles.label}>Age Group</p>
            <div style={styles.row}>
              {["0-2", "2-6", "7-12"].map((age) => (
                <button
                  key={age}
                  onClick={() => {
                    setAgeGroup(age);
                    setSize("");
                  }}
                  style={ageGroup === age ? styles.optionActive : styles.option}
                >
                  {age} Years
                </button>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div style={styles.block}>
            <p style={styles.label}>Select Size</p>

            <div style={styles.row}>
              {getSizes(ageGroup).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  style={size === s ? styles.optionActive : styles.option}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* PARENT GUIDE */}
            {ageGroup === "2-6" && productType === "top" && (
              <div style={styles.helperBox}>
                <p style={styles.helperTitle}>Size Guide</p>
                <p style={styles.helper}>
                  Sizes <b>90–160</b> follow Korean sizing standards.
                  Not exact cm, but based on average child height.
                </p>
                <p style={styles.helper}>
                  Rough guide:  
                  S (90–100) · M (110–120) · L (130–140) · XL (150–160)
                </p>
              </div>
            )}

            {ageGroup === "2-6" && productType === "bottom" && (
              <div style={styles.helperBox}>
                <p style={styles.helperTitle}>Size Guide</p>
                <p style={styles.helper}>
                  Jeans & bottoms use standard kids sizing:
                  S · M · L · XL
                </p>
              </div>
            )}
          </div>

          {/* QUANTITY */}
          <div style={styles.block}>
            <p style={styles.label}>Quantity</p>
            <div style={styles.qtyRow}>
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                style={styles.qtyBtn}
              >
                −
              </button>
              <span style={styles.qty}>{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                style={styles.qtyBtn}
              >
                +
              </button>
            </div>
          </div>

          {/* ADD TO CART */}
          <button
            disabled={!inStock || !size}
            onClick={handleAddToCart} // Added click handler
            style={
              inStock && size
                ? styles.cartBtn
                : styles.cartBtnDisabled
            }
          >
            Add to Cart
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetails;

/* ================= STYLES ================= */

const styles = {
  page: {
    background: "#f7f1e8",
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "60px 20px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
  },

  imageWrap: {
    position: "relative",
  },

  image: {
    width: "100%",
    borderRadius: "32px",
    objectFit: "cover",
  },

  stockBadge: {
    position: "absolute",
    top: "16px",
    left: "16px",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "12px",
  },

  details: {
    display: "flex",
    flexDirection: "column",
    gap: "26px",
  },

  title: {
    fontSize: "36px",
    fontWeight: "600",
  },

  desc: {
    fontSize: "15px",
    color: "#555",
    lineHeight: "1.7",
    maxWidth: "460px",
  },

  block: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "500",
  },

  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  option: {
    padding: "10px 16px",
    borderRadius: "999px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontSize: "13px",
  },

  optionActive: {
    padding: "10px 16px",
    borderRadius: "999px",
    border: "none",
    background: "#c6ab9a",
    fontSize: "13px",
    fontWeight: "500",
  },

  helperBox: {
    background: "#fff",
    borderRadius: "12px",
    padding: "14px 16px",
    marginTop: "10px",
  },

  helperTitle: {
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "6px",
  },

  helper: {
    fontSize: "12px",
    color: "#777",
  },

  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  qtyBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
    fontSize: "18px",
    lineHeight: "0",
  },

  qty: {
    fontSize: "14px",
    fontWeight: "500",
  },

  cartBtn: {
    marginTop: "20px",
    padding: "16px",
    borderRadius: "999px",
    border: "none",
    background: "#2b2b2b",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  },

  cartBtnDisabled: {
    marginTop: "20px",
    padding: "16px",
    borderRadius: "999px",
    border: "none",
    background: "#999",
    color: "#fff",
    fontSize: "14px",
    cursor: "not-allowed",
  },
};
