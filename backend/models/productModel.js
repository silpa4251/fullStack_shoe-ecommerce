const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
         type: String, 
         required: true 
        },
    description: {
         type: String, 
         required: true 
        },
    price: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number,
        required: true 
    },
    image_url: { 
        type: String, 
        required: true 
    },
    in_stock: { 
        type: Boolean, 
        required: true 
    },
    featured: { 
        type: Boolean, 
        required: true 
    },
    stars: { 
        type: Number, 
        required: true 
    },
    discount: { 
        type: Number 
    },
    warranty: { 
        type: String 
    },
    additional_details: { 
        type: String 
    },
  },{ timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
