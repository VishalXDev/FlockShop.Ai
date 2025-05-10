const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: String, required: true }, // ← changed from ObjectId
  users: [{ type: String }] // ← changed from ObjectId[]
}, { timestamps: true });


module.exports = mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);
