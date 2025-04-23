import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register New User
export const register = async (request, response) => {
    const { username, password } = request.body;
    if (!username || !password) {
        return response.status(400).json({ message: "Username and password are required" });
    }

    if (password.length < 6 || !/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
        return response.status(400).json({ message: "Password must be at least 6 characters and contain at least 1 letter and 1 number." });
    }

    try {
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return response.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            password: hashedPassword,
        })

        await user.save();

        return response.status(201).json({ message: "User Registered Successfully" });

    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

// Login User
export const login = async (request, response) => {
    const { username, password } = request.body;
    if (!username || !password) {
        return response.status(400).json({ message: "Username and password are required" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return response.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        response.json({ token });

    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

// Middleware to verify JWT
export const verifyToken = (request, response, next) => {
    const token = request.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return response.status(401).json({ message: "Access denied. No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded;
      next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        response.status(401).json({ message: "Invalid token" });
    }
};