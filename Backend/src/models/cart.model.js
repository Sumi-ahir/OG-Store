import mongoose from "mongoose";
import priseSchema from "./price.schema.js";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      qty: {
        type: Number,
        default: 1,
      },
      price: {
        type: priseSchema,
        required: true,
      },
    },
  ],
});
const cartModel = mongoose.model("Cart", cartSchema);
export default cartModel;
