const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
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
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
  purchaseDate: {
    type: Date,
    default: Date.now,
    required: true,
  },

  totalPrice: {
    type: Number,
    required: true,
  },
  totalItem: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    landmark: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    phone: Number,
    country: String,
    paymentMethod: String,
  },
});

module.exports = mongoose.model("orders", orderSchema);
