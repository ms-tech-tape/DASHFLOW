import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../models/productModel.js";

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error("Get Products Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get product by ID
export const getProduct = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error("Get Product Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


// Create product
export const addProduct = async (req, res) => {
    try {
        const {
            category_id,
            product_name,
            price,
            sku
        } = req.body || {};

        // Check required fields
        if (
            category_id === undefined ||
            !product_name?.trim() ||
            price === undefined ||
            !sku?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Category ID, product name, price and SKU are required"
            });
        }

        // Validate category ID
        if (!Number.isInteger(Number(category_id)) ||
            Number(category_id) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID"
            });
        }

        // Validate product name
        if (typeof product_name !== "string") {
            return res.status(400).json({
                success: false,
                message: "Product name must be a string"
            });
        }

        // Validate price
        if (!Number.isFinite(Number(price)) || Number(price) < 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be a valid non-negative number"
            });
        }

        // Validate SKU
        if (typeof sku !== "string") {
            return res.status(400).json({
                success: false,
                message: "SKU must be a string"
            });
        }

        const product = await createProduct(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });

    } catch (error) {
        console.error("Create Product Error:", error);

        // Duplicate SKU
        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Product SKU already exists"
            });
        }

        // Invalid category foreign key
        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Update product
export const editProduct = async (req, res) => {
    try {
        const product = await updateProduct(req.params.id, req.body);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        console.error("Update Product Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Delete product
export const removeProduct = async (req, res) => {
    try {
        const product = await deleteProduct(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error("Delete Product Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};