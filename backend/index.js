import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/connectDB.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB();

// Test Route
app.get("/api", (request, response) => {
    response.json({ message: "Welcome to my Portfolio API" });
  });

const PORT = process.env.PORT || 8989;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));