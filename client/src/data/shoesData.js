import p1 from "../assets/product1.jpg";
import p2 from "../assets/product2.jpg";
import p3 from "../assets/product3.jpg";

const shoesData = [
  {
    id: 1,
    img: p1,
    name: "Kids White Sneakers",
    price: 1499,
    type: "Sneakers",
    size: 22,
    stock: true,
    description:
      "Premium Korean imported sneakers designed for comfort and style. Soft inner sole and durable outer grip.",
  },
  {
    id: 2,
    img: p2,
    name: "Brown Winter Boots",
    price: 1999,
    type: "Boots",
    size: 28,
    stock: false,
    description:
      "Warm winter boots perfect for cold weather. Stylish and long-lasting material.",
  },
  {
    id: 3,
    img: p3,
    name: "Comfort Sandals",
    price: 999,
    type: "Sandals",
    size: 19,
    stock: true,
    description:
      "Lightweight and breathable sandals for everyday comfort.",
  },
];

export default shoesData;