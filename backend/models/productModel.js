const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 100,
    },
    category: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Kids"],
    },
    available_sizes: {
      type: [String],
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    in_stock: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    stars: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    special_offer: {
      type: String,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
    },
    warranty: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    additional_details: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
productSchema.index({ name: 1, category: 1 });

productSchema.virtual("finalPrice").get(function () {
  return this.discount ? this.price - (this.price * this.discount) / 100 : this.price;
});

productSchema.pre(/^find/, function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});


module.exports = mongoose.model("products", productSchema);
