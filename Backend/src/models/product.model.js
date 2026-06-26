import mongoose from "mongoose";
import priseSchema from "./price.schema.js";
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    category: {
      type: String,
      enum: ["men", "women"],
      required: true,
    },
    price: {
      type: priseSchema,
      required: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        // ,alt:{
        //     type:String,
        //     required:true
        // }
      },
    ],
    sizes: [String],
  },
  { timestamps: true },
);
const productModel = mongoose.model("Product", productSchema);
export default productModel;
