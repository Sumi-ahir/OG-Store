import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import orderRouter from "./routes/order.routes.js";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./config/config.js";

const app = express();
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  cors({
    origin: 
      // "http://localhost:5173", 
      // "http://localhost:5174",
      process.env.CLIENT_URL
      // "https://og-store-woad.vercel.app"
    ,

    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("trust proxy", 1);
console.log("API LAYER LOADED");
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/order", orderRouter);
export default app;
