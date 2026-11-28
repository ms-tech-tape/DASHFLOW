import express from "express";
import pool from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// User APIs
app.use("/api/users", userRoutes);

// Product APIs
app.use("/api/products", productRoutes);

// Order APIs
app.use("/api/orders", orderRoutes);

// Admin APIs
app.use("/api/admin", adminRoutes);

// Test Database Connection
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.status(200).json({
            success: true,
            message: "PostgreSQL connected successfully!",
            time: result.rows[0].now
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

app.listen(PORT, () => {
    console.log(`DASHFLOW Backend running on port ${PORT}`);
});