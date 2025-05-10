const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const wishlistRoutes = require("./routes/wishlists");
const productRoutes = require("./routes/product");

const app = express();

// Rocket animation
const rocketFrames = [
  "🚀     ",
  " 🚀    ",
  "  🚀   ",
  "   🚀  ",
  "    🚀 ",
  "     🚀",
  "      🚀",
  "     🚀 ",
  "    🚀  ",
  "   🚀   ",
  "  🚀    ",
  " 🚀     ",
  "🚀      "
];

let frameIndex = 0;

// Function to animate the rocket
const animateRocket = () => {
  process.stdout.write("\x1B[2J\x1B[0f"); // Clear the console
  console.log(rocketFrames[frameIndex]); // Show the current frame
  frameIndex = (frameIndex + 1) % rocketFrames.length; // Move to the next frame, loop back when end is reached
};

// Animate the rocket every 100ms
const rocketInterval = setInterval(animateRocket, 100);

// Stop animation once the server is up
const stopRocketAnimation = () => {
  clearInterval(rocketInterval);
};

// Middleware and routes setup
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use("/api/products", productRoutes);

// 404 Route Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("✅ Server running on port", process.env.PORT || 5000);
      stopRocketAnimation(); // Stop the animation after the server is up
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit the process if the DB connection fails
  });
