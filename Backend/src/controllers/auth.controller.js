import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import bcrypt from "bcryptjs";

// TOKEN
async function sendTokenResponse(user, res, message) {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message,
    token,
    user: {
      id: user._id,
      email: user.email,
      contact: user.contact,
      username: user.username,
      role: user.role,
    },
  });
}

// REGISTER USER
export const registerUser = async (req, res) => {
  console.log("REGISTER START");

  const { email, contact, username, password, isSeller } = req.body;

  try {
    // CHECK USER EXISTS
    const existUser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    // CREATE USER
    const user = await userModel.create({
      email,
      contact,
      username,
      password,
      role: isSeller ? "seller" : "buyer",
    });
    console.log("USER CREATED:", user);

    // SEND TOKEN
    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user,
    });
  } catch (error) {
    console.log("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    const user = await userModel.findOne({ email }).select("+password");

    console.log("USER:", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("DB PASSWORD:", user.password);

    const isMatch = await user.comparePassword(password);

    console.log("MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return await sendTokenResponse(user, res, "Login successfully!");
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET ME
export const getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GOOGLE CALLBACK
export const googleCallback = async (req, res) => {
  try {
    const { id, displayName, emails, photos } = req.user;

    const email = emails[0].value;
    const profilePic = photos[0].value;
    const role = req.user.selectedRole || "buyer";
    let user = await userModel.findOne({ email });

    // CREATE GOOGLE USER
    if (!user) {
      user = await userModel.create({
        email,
        googleId: id,
        username: displayName,
        profilePic,
        role,
      });
    }

    // TOKEN
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    // COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    // REDIRECT FRONTEND
    // res.redirect("http://localhost:5173/");
    if (user.role === "seller") {
    return res.redirect("http://localhost:5173/seller/dashboard");
    }
    return res.redirect("http://localhost:5173/");
  } catch (error) {
    console.log("Google auth error:", error);

    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
      error: error.message,
    });
  }
};
