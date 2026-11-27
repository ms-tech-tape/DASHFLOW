
import pool from "../config/db.js";

// Get all orders
export const getAllOrders = async () => {
    const result = await pool.query(
        `SELECT * FROM orders ORDER BY order_id`
    );

    return result.rows;
};

// Get order by ID
export const getOrderById = async (orderId) => {
    const result = await pool.query(
        `SELECT * FROM orders WHERE order_id = $1`,
        [orderId]
    );

    return result.rows[0];
};

// Create order
export const createOrder = async (order) => {
    const {
        user_id,
        total_amount,
        order_status,
        payment_status,
        shipping_address
    } = order;

    const result = await pool.query(
        `INSERT INTO orders
        (user_id, total_amount, order_status,
         payment_status, shipping_address)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
            user_id,
            total_amount,
            order_status ?? "pending",
            payment_status ?? "pending",
            shipping_address
        ]
    );

    return result.rows[0];
};

// UPDATE order 
export const updateOrder = async (orderId, order) => {
    const allowedFields = {
        user_id: "user_id",
        total_amount: "total_amount",
        order_status: "order_status",
        payment_status: "payment_status",
        shipping_address: "shipping_address"
    };

    const updates = [];
    const values = [];

    for (const [key, column] of Object.entries(allowedFields)) {
        if (Object.hasOwn(order, key)) {
            values.push(order[key]);
            updates.push(`${column} = $${values.length}`);
        }
    }

    if (updates.length === 0) {
        return undefined;
    }

    values.push(orderId);

    const result = await pool.query(
        `UPDATE orders
         SET ${updates.join(", ")},
             updated_at = CURRENT_TIMESTAMP
         WHERE order_id = $${values.length}
         RETURNING *`,
        values
    );

    return result.rows[0];
};

// Delete order and its associated items
export const deleteOrder = async (orderId) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        await client.query(
            `DELETE FROM order_items WHERE order_id = $1`,
            [orderId]
        );

        const result = await client.query(
            `DELETE FROM orders
             WHERE order_id = $1
             RETURNING order_id`,
            [orderId]
        );

        await client.query("COMMIT");

        return result.rows[0];

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};
