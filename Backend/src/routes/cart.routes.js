import express from "express";

const router = express.Router();

import { validateaddCart } from "../validator/cart.validator.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";

router.post("/add/:productId", authenticateUser, validateaddCart, addToCart);

router.get("/", authenticateUser, getCart);

export default router;
