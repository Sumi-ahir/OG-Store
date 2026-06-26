import { body, param, validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};

export const validateaddCart = [
  param("productId").isMongoId().withMessage("Invalid product Id"),

  body("qty")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  validateRequest,
];
