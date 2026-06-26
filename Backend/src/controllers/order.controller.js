import orderModel from "../models/order.schema.js";
import productModel from "../models/product.model.js";
import razorpay from "../services/payment.service.js";
export const createOrder = async (req, res) => {
  try {
    const { products, shippingAddress, totalAmount, paymentMethod } = req.body;

    // creating DB Order
    const items = await Promise.all(
      products.map(async (item) => {
        const product = await productModel.findById(item.productId);

        return {
          product: product._id,
          seller: product.seller,
          title: product.title,
          image: product.images?.[0]?.url,
          qty: item.qty,
          price: product.price.amount,
        };
      }),
    );

    const order = await orderModel.create({
      user: req.user._id,
      items,
      shippingAddress,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "paid" : "pending",
    });

    // if COD
    if(paymentMethod==='COD'){
      return res.status(201).json({sucess:true,order})
    }

    // Razorpay order create
    const razorpayOrder=await razorpay.orders.create({
      amount:totalAmount*100,
      currency:'INR',
      receipt:order._id.toString(),
    })
    console.log("RAZORPAY ORDER =>", razorpayOrder);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
      razorpayOrder
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SELLER ORDER
export const getSellerOrder = async (req, res) => {
  try {
    console.log("SELLER ID:", req.user._id);

    const orders = await orderModel
      .find({
        "items.seller": req.user._id,
      })
      .populate("user", "name email")
      .populate("items.product");

    console.log("ORDERS FOUND:", orders);
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
