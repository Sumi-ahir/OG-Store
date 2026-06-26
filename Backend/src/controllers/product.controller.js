import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

// SELLER create Product
export async function createProduct(req, res) {
  try {
    console.log("REQ BODY:", req.body);
    console.log("PRICE AMOUNT:", req.body.priceAmount);

    const { title, description, priceAmount, priceCurrency, sizes, category } =
      req.body;
    const seller = req.user;
    console.log("CREATE SELLER:", seller._id);
    const parsedSizes = sizes ? JSON.parse(sizes) : [];
    const images = await Promise.all(
      req.files.map(async (file) => {
        return await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        });
      }),
    );

    const product = await productModel.create({
      title,
      description,
      category,
      price: {
        amount: priceAmount,
        currency: priceCurrency || "INR",
      },
      images,
      sizes: parsedSizes,
      seller: seller._id,
    });
    console.log("SAVED PRICE:", product.price.amount);

    return res.status(201).json({
      message: "product created successfully !",
      success: true,
      product,
    });
  } catch (error) {
    console.log("CREATE PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
// SELLER UPDATE PRODUCT
export async function updateProduct(req, res) {
  try {
    const { title, description, priceAmount, priceCurrency, category, sizes } =
      req.body;

    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // update images
    if (req.files && req.files.length > 0) {
      const images = await Promise.all(
        req.files.map(async (file) => {
          return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname,
          });
        }),
      );

      product.images = images;
    }

    product.title = title;
    product.description = description;
    product.category = category;

    product.price = {
      amount: priceAmount,
      currency: priceCurrency || "INR",
    };

    product.sizes = sizes ? JSON.parse(sizes) : [];

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
}
// GET SELLER PRODUCTS
export const getSellerProduct = async (req, res) => {
  try {
    const seller = req.user;
    const products = await productModel.find({
      seller: seller._id,
    });
    console.log("REQ.USER:", req.user);
    console.log("LOGIN SELLER:", req.user._id);
    console.log("SELLER PRODUCTS:", products);
    console.log("REQ USER:", req.user);
    console.log("SELLER ID:", req.user._id);

    return res
      .status(200)
      .json({ message: "product fetch successfully !", products });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
//(public)get all products
export async function getAllProduct(req, res) {
  const product = await productModel.find();

  return res.status(200).json({
    message: "product fetched successfully!",
    success: true,
    product,
  });
}
// product detail
export async function getProductDetails(req, res) {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not ound !",
      success: false,
    });
  }
  return res.status(200).json({
    message: "Product deatil fetched successfully!",
    success: true,
    product,
  });
}
// delete prouct (seller)
export const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await productModel.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
    console.log("PRODUCT SELLER:", product.seller.toString());
    console.log("LOGGED USER:", req.user._id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
