
import pool from "../config/db.js";

// Get all products
export const getAllProducts = async () => {
    const result = await pool.query(
        `SELECT *
         FROM products
         ORDER BY product_id`
    );

    return result.rows;
};

// Get product by ID
export const getProductById = async (productId) => {
    const result = await pool.query(
        `SELECT *
         FROM products
         WHERE product_id = $1`,
        [productId]
    );

    return result.rows[0];
};

// Create product
export const createProduct = async (product) => {
    const {
        category_id,
        product_name,
        description,
        price,
        stock_quantity,
        sku,
        is_active
    } = product;

    const result = await pool.query(
        `INSERT INTO products
        (category_id, product_name, description, price,
         stock_quantity, sku, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
            category_id,
            product_name,
            description || null,
            price,
            stock_quantity ?? 0,
            sku,
            is_active ?? true
        ]
    );

    return result.rows[0];
};

// Update product
export const updateProduct = async (productId, product) => {
    const {
        category_id,
        product_name,
        description,
        price,
        stock_quantity,
        sku,
        is_active
    } = product;

    const result = await pool.query(
        `UPDATE products
         SET category_id = $1,
             product_name = $2,
             description = $3,
             price = $4,
             stock_quantity = $5,
             sku = $6,
             is_active = $7
         WHERE product_id = $8
         RETURNING *`,
        [
            category_id,
            product_name,
            description ?? null,
            price,
            stock_quantity,
            sku,
            is_active,
            productId
        ]
    );

    return result.rows[0];
};

// Delete product
export const deleteProduct = async (productId) => {
    const result = await pool.query(
        `DELETE FROM products
         WHERE product_id = $1
         RETURNING product_id`,
        [productId]
    );

    return result.rows[0];
};
