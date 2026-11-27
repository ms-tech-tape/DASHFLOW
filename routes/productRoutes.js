import express from "express";

import {
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    removeProduct
} from "../controllers/productController.js";

const router = express.Router();

// GET all products
router.get("/", getProducts);

// GET product by ID
router.get("/:id", getProduct);

// CREATE product
router.post("/", addProduct);

// UPDATE product
router.put("/:id", editProduct);

// DELETE product
router.delete("/:id", removeProduct);

export default router;