import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import "./src/config/passport.config.js";
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  console.log("AUTH ROUTES MOUNTED");
  console.log("JWT:", process.env.JWT_SECRET);
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
