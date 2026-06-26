import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
// addcart
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { qty = 1 } = req.body;
    const userId = req.user._id;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await cartModel.findOne({
      user: userId,
    });

    if (!cart) {
      cart = new cartModel({
        user: userId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.items.push({
        product: product._id,
        qty,
        price: product.price,
      });
    }

    await cart.save();

    console.log("CART SAVED:", JSON.stringify(cart, null, 2));

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  const user = req.user;
  let cart = await cartModel
    .findOne({ user: user._id })
    .populate("items.product");

  if (!cart) {
    cart = await cartModel.create({ user: user._id, items: [] });
  }
  return res.status(200).json({
    message: "cart fetched successfully !",
    success: true,
    cart,
  });
};
