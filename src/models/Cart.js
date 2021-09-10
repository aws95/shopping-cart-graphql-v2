const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { productSchema } = require("./Product");

const itemSchema = new Schema(
  {
    product: { type: productSchema },
    count: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const cartSchema = new Schema(
  {
    items: { type: [itemSchema], required: true },
    total_count: { type: Number, required: true },
    total_price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Cart = mongoose.model("Cart", cartSchema);
const Item = mongoose.model("Item", itemSchema);
module.exports = { Cart, cartSchema, itemSchema, Item };
