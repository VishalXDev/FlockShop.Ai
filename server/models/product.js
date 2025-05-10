const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    imageURL: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },

    price: { type: Number, required: true, min: 0 },

    addedBy: { type: String, required: true },

    wishlistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wishlist",
      required: true,
    },

    reactions: [
      {
        emoji: { type: String, required: true },
        by: { type: String, required: true }, // ← changed from ObjectId to String
      },
    ],

    comments: [
      {
        text: { type: String, required: true },
        by: { type: String, required: true }, // ← changed from ObjectId to String
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
