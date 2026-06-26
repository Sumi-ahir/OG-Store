import { body, validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("invalid email formate")
    .notEmpty()
    .withMessage("email is required"),

  body("contact")
    .notEmpty()
    .withMessage("contact is required")
    .isLength({ min: 10, max: 13 })
    .withMessage("contact must be in between 10 to 13 character")
    .isNumeric()
    .withMessage("contact must be Only numaric"),

  body("username")
    .notEmpty()
    .withMessage("fullname is required")
    .isLength()
    .withMessage("fullname must be at least 2 characters"),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength()
    .withMessage("Full name must be at least 6characters")
    .matches(/[A-Z]/)
    .withMessage("password Must contain uppercase")
    .matches(/[0-9]/)
    .withMessage("password Must contain number"),
];

export const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required!")
    .isEmail()
    .withMessage("please enter valid email!"),

  body("password").trim().notEmpty().withMessage("password is required!"),

  validateRequest,
];

// import {body,validationResult} from 'express-validater';

// function validateRequest(req,res,next){
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()})
//     }
//     next();
// }
// export const validateRegisterUser=[
//     body('email')
//     .isEmail().withMessage('Inalid email formate'),
//     body('contact')
//     .notEmpty().withMessage('contact is required')
//     .matches(/^\d{13}$/).withMessage('contact must be in between 10 to 13 character'),
//     body('password')
//     .isLength({min:6}).withMessage('Password must be atlist 6 character'),
//     body('fullname')
//     .notEmpty().withMessage('full name is required')
//     .isLength({min:2}),withMessage('Password must be atlist 2 characters long'),

//     validateRequest
// ]
