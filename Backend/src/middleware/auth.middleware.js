// import { config } from 'dotenv';
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { config } from "../config/config.js";

export const authenticateUser = async (req, res, next) => {
  console.log("========== AUTH ==========");
  console.log("Origin:", req.headers.origin);
  console.log("Cookie Header:", req.headers.cookie);
  console.log("Parsed Cookies:", req.cookies);
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "unauthorized!",
      success: false,
      err: "no token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    console.log("TOKEN USER ID:", decoded.id);

    const user = await userModel.findById(decoded.id);
    console.log("AUTH USER:", user.email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized!",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }
};
