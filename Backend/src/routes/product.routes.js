import { Router } from "express";
import { authenticateSeller } from "../middleware/product.middleware.js";
import {
  createProduct,
  getAllProduct,
  getSellerProduct,
  getProductDetails,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { productValidator } from "../validator/product.validator.js";
import multer from "multer";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// productcreate (seller)
router.post(
  "/",
  authenticateSeller,
  upload.array("images", 7),
  productValidator,
  createProduct,
);
// productget(seller)
router.get("/seller", authenticateSeller, getSellerProduct);

// get all products(public)
router.get("/", getAllProduct);

// get product detail
router.get("/detail/:id", getProductDetails);

// delete product (seller)
router.delete("/:id", authenticateSeller, deleteProduct);

// update product (seller)
router.put(
  "/update/:id",
  authenticateSeller,
  upload.array("images", 7),
  updateProduct,
);

export default router;
