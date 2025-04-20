import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/connectDB.js";
import { limiter } from "./src/Utils/Utils.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(limiter);

// MongoDB Connection
connectDB();

// Routes
import projectRoutes from "./src/Routes/projectRoutes.js";
import contactRoutes from "./src/Routes/contactRoutes.js";
import artRoutes from "./src/Routes/artRoutes.js";
import authRoutes from "./src/Routes/authRoutes.js";

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/art", artRoutes);
app.use("/api/auth", authRoutes);

// Serve uploaded images
app.use("/uploads", express.static("Uploads"));

// Test Route
app.get("/api", (request, response) => {
  response.json({ message: "Welcome to the Portfolio API" });
});

// Global Error Handler
import { globalErrorHandler } from "./src/Utils/Utils.js";
app.use(globalErrorHandler);


const PORT = process.env.PORT || 8989;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));