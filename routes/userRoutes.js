
import express from "express";
import { body, validationResult } from "express-validator";
import { validateUser } from "../middleware/userValidation.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

import {
    getUsers,
    getUser,
    addUser,
    editUser,
    removeUser,
    loginUser
} from "../controllers/userController.js";

const router = express.Router();

// Validation middleware
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    next();
};

// GET all users
router.get("/", getUsers);

// POST Login
router.post(
    "/login",
    [
        body("email")
            .trim()
            .isEmail()
            .withMessage("Enter a valid email"),

        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ],
    checkValidation,
    loginUser
);

// GET user by ID
router.get("/:id", getUser);
export const getUserByEmail = async (email) => {
    const result = await pool.query(
        `SELECT user_id, first_name, last_name, email, password_hash, role
         FROM users
         WHERE email = $1`,
        [email]
    );
    return result.rows[0];
};

// POST create user
router.post("/", validateUser, checkValidation, addUser);

// PUT update user
router.put("/:id", editUser);

// DELETE user
router.delete("/:id", removeUser);

export default router;
