
import express from "express";
import { body, validationResult } from "express-validator";

import { validateUser } from "../middleware/userValidation.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

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
            success: false,
            errors: errors.array()
        });
    }

    next();
};

// PUBLIC: Login
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

// PUBLIC: Register new user
router.post(
    "/",
    validateUser,
    checkValidation,
    addUser
);

// ADMIN ONLY: Get all users
router.get(
    "/",
    authenticateToken,
    authorizeRoles("admin"),
    getUsers
);

// ADMIN ONLY: Get user by ID
router.get(
    "/:id",
    authenticateToken,
    authorizeRoles("admin"),
    getUser
);

// ADMIN ONLY: Update user
router.put(
    "/:id",
    authenticateToken,
    authorizeRoles("admin"),
    editUser
);

// ADMIN ONLY: Delete user
router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("admin"),
    removeUser
);

export default router;
