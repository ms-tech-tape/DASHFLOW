import pool from "../config/db.js";
import bcrypt from "bcrypt";

// Get all users
export const getAllUsers = async () => {
    const result = await pool.query(
        `SELECT user_id, first_name, last_name, email, phone, created_at
         FROM users
         ORDER BY user_id`
    );

    return result.rows;
};

// Get user by ID
export const getUserById = async (userId) => {
    const result = await pool.query(
        `SELECT user_id, first_name, last_name, email, phone, created_at
         FROM users
         WHERE user_id = $1`,
        [userId]
    );

    return result.rows[0];
};


// Create user
export const createUser = async (user) => {
    const {
        first_name,
        last_name,
        email,
        password,
        phone
    } = user;

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `INSERT INTO users
         (first_name, last_name, email, password_hash, phone)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING user_id, first_name, last_name, email, phone, created_at`,
        [first_name, last_name, email, password_hash, phone || null]
    );

    return result.rows[0];
};

// Update user
export const updateUser = async (userId, user) => {
    const { first_name, last_name, email, phone } = user;

    const result = await pool.query(
        `UPDATE users
         SET first_name = $1,
             last_name = $2,
             email = $3,
             phone = $4
         WHERE user_id = $5
         RETURNING user_id, first_name, last_name, email, phone`,
        [first_name, last_name, email, phone, userId]
    );

    return result.rows[0];
};

// Delete user
export const deleteUser = async (userId) => {
    const result = await pool.query(
        `DELETE FROM users
         WHERE user_id = $1
         RETURNING user_id`,
        [userId]
    );

    return result.rows[0];
};