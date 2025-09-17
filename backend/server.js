import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/books.js";
import transactionRoutes from "./routes/transactions.js";
import categoryRoutes from "./routes/categories.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

// Debug: log MongoDB URI to verify it's loaded correctly
console.log("MONGO_URL:", process.env.MONGO_URL);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MONGODB CONNECTED");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Root route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to LibraryApp");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
