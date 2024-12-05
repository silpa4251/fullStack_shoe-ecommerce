const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      size: {
        type: Number,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type:   Number,
      },
      totalProductPrice: {
        type: Number,
        required: true,
      },
    },
  ],
totalCartPrice: {
  type: Number,
  required: true,
},
});

module.exports = mongoose.model("cart", cartSchema);
