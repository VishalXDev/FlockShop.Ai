const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const verifyToken = require("../middleware/verifyToken");
// Get all wishlists
router.get("/", async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.json(wishlists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching wishlists" });
  }
});

// Create a new wishlist
router.post("/", async (req, res) => {
  try {
    const { name, createdBy, users } = req.body;
    if (!name || !createdBy) {
      return res.status(400).json({ message: "Missing name or creator" });
    }
    const newWishlist = new Wishlist({ name, createdBy, users });
    await newWishlist.save();
    res.status(201).json(newWishlist);
  } catch (err) {
    res.status(500).json({ message: "Error creating wishlist" });
  }
});

// Delete a wishlist
router.delete("/:id", async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Wishlist deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting wishlist" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ createdBy: req.user.uid }); // Only their wishlists
    res.json(wishlists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching wishlists" });
  }
});
module.exports = router;
