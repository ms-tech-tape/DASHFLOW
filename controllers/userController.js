
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../models/userModel.js";

// GET all users
export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Get users error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// GET user by ID
export const getUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);

        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error("Get user error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// CREATE user
export const addUser = async (req, res) => {
    try {
        const user = await createUser(req.body);

        res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        console.error("Create user error:", error.message);

        if (error.code === "23505") {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        res.status(500).json({ message: "Internal server error" });
    }
};

// UPDATE user
export const editUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);

        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const user = await updateUser(userId, req.body);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user
        });

    } catch (error) {
        console.error("Update user error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE user
export const removeUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);

        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const user = await deleteUser(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        console.error("Delete user error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// LOGIN user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password with stored hash
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT
        const token = jwt.sign(
        {
            userId: user.user_id,
            email: user.email,
            role: user.role
        },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                user_id: user.user_id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};