import rateLimit from "express-rate-limit";


// Rate Limiter - Protects against brute-force attacks
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 100, // Limit each IP to 100 requests per window
});

// Global Error Handler
export const globalErrorHandler = (error, request, response, next) => {
    console.error(error.stack);
    response.status(500).json({ message: "Something went wrong!" });
  };