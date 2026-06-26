import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ message: "validation error", error });
  }
  next();
}
export const productValidator = [
  body("title").notEmpty().withMessage("Title is required !"),
  body("description").notEmpty().withMessage("Description is required"),
  body("priceAmount").isNumeric().withMessage("price amount must be a number"),
  body("priceCurrency").notEmpty().withMessage("priceCurrency is required"),

  validateRequest,
];
