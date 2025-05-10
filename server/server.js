const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const wishlistRoutes = require("./routes/wishlists");
const productRoutes = require("./routes/product");

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use("/api/products", productRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log("✅ Server running on port", process.env.PORT || 5000)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
