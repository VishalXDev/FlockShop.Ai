const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const wishlistRoutes = require("./routes/wishlists");
const productRoutes = require("./routes/product");

const app = express();

// ✅ Updated CORS configuration
app.use(cors({
  origin: "https://flock-shop-ai.vercel.app", // Allow Vercel frontend
  credentials: true,
}));

// Body parser
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use("/api/products", productRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// MongoDB Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("✅ Server running on port", process.env.PORT || 5000);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
