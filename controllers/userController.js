
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../models/userModel.js";

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
