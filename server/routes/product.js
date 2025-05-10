const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Get products in a wishlist
router.get("/:wishlistId", async (req, res) => {
  try {
    const products = await Product.find({ wishlistId: req.params.wishlistId });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Create a product
router.post("/", async (req, res) => {
  try {
    const { name, imageURL, price, wishlistId, addedBy } = req.body;

    if (!name || !imageURL || !price || !wishlistId || !addedBy) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const product = new Product({ name, imageURL, price, wishlistId, addedBy });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error("Server error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});

// Update product
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Error updating product" });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Error deleting product" });
  }
});

// Add emoji reaction
router.post("/:id/react", async (req, res) => {
  try {
    const { emoji, by } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.reactions.push({ emoji, by });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Error adding reaction:", err);
    res.status(500).json({ message: "Error adding reaction" });
  }
});

// Add comment
router.post("/:id/comment", async (req, res) => {
  try {
    const { text, by } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.comments.push({ text, by });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: "Error adding comment" });
  }
});

module.exports = router;
