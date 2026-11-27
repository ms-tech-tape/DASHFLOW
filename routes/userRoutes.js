
import express from "express";
import { validationResult } from "express-validator";
import { validateUser } from "../middleware/userValidation.js";

import {
    getUsers,
    getUser,
    addUser,
    editUser,
    removeUser
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

// GET user by ID
router.get("/:id", getUser);

// POST create user
router.post("/", validateUser, checkValidation, addUser);

// PUT update user
router.put("/:id", editUser);

// DELETE user
router.delete("/:id", removeUser);

export default router;
