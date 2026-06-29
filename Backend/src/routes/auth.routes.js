import { Router } from "express";

import {
  registerUser,
  loginUser,
  getMe,
  googleCallback,
  logout
} from "../controllers/auth.controller.js";

import {
  registerValidator,
  loginValidator,
} from "../validator/auth.validator.js";

import { authenticateUser } from "../middleware/auth.middleware.js";

import { config } from "../config/config.js";

import passport from "passport";

const router = Router();

// REGISTER
router.post("/register", registerValidator, registerUser);

// LOGIN
router.post("/login", loginValidator, loginUser);

// GET ME
router.get("/me", authenticateUser, getMe);

// GOOGLE LOGIN
router.get(
  "/google", (req, res, next) =>{
  passport.authenticate("google", {
    scope: ["profile", "email"],
     state: req.query.role,
  })(req,res,next);
});

// GOOGLE CALLBACK
router.get(
  "/google/callback",

  passport.authenticate("google", {
    session: false,

    failureRedirect:
      config.NODE_ENV === "development"
        ? "http://localhost:5173/login"
        : "/login",
  }),

  googleCallback,
);

// LOGOUT
router.post("/logout", logout);

export default router;
