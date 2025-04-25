import express from "express";
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
import projectRoutes from "./src/routes/projectRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import artRoutes from "./src/routes/artRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

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