import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register New User
export const register = async (request, response) => {
    const { username, password } = request.body;
    if (!username || !password) {
        return response.status(400).json({ message: "Username and password are required" });
    };

    if (password.length < 6 || !/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
        return response.status(400).json({ message: "Password must be at least 6 characters and contain at least 1 letter and 1 number." });
    };

    try {
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return response.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            password: hashedPassword,
        });
        await user.save();

        return response.status(201).json({ message: "User Registered Successfully" });
    } catch (error) {
        return response.status(500).json({ message: error.message });
    };
};

