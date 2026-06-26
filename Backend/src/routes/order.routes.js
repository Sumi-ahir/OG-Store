import express from "express";
import {
  createOrder,
  getSellerOrder,
} from "../controllers/order.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { authenticateSeller } from "../middleware/product.middleware.js";
const router = express.Router();

router.post("/createOrder", authenticateUser, createOrder);

// router.post('/payment/createOrder',authenticateUser)
router.get("/sellerOrder", authenticateSeller, getSellerOrder);
export default router;
