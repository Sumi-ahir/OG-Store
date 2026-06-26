import wishlistModel from "../models/wishlist.model.js";
import productModel from "../models/product.model.js";

// ADD PRODUCT TO WISHLIST
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        sucess: false,
        message: "Product not found",
      });
    }
    let wishlist = await wishlistModel.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await wishlistModel.create({
        user: userId,
        items: [],
      });
    }
    const exist = wishlist.items.find(
      (item) => item.product.toString() === productId,
    );
    if (!exist) {
      wishlist.items.push({
        product: productId,
      });
      await wishlist.save();
    }
    return res.status(200).json({
      sucess: true,
      wishlist,
    });
  } catch (err) {
    console.log("WISHLIST: ", err);
    return res.status(500).json({
      sucess: false,
      message: err.message,
    });
  }
};

// GET WISHLIST
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistModel
      .findOne({ user: req.user._id })
      .populate("items.product");

    return res.status(200).json({
      sucess: true,
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// REMOVE PRODUCT FROM WISHLIST
export const removeWishlistItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await wishlistModel.findOne({
      user: req.user._id,
    });
    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId,
    );
    await wishlist.save();

    return res.status(200).json({
      sucess: true,
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
