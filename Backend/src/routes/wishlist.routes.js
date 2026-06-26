import express from "express";

const router = express.Router();
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
} from "../controllers/wishlist.controller.js";

router.post("/add/:productId", authenticateUser, addToWishlist);
router.get("/", authenticateUser, getWishlist);
router.delete("/remove/:productId", authenticateUser, removeWishlistItem);

export default router;
