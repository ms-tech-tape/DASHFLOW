
import {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} from "../models/orderModel.js";

// GET all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await getAllOrders();

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error("Get Orders Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// GET order by ID
export const getOrder = async (req, res) => {
    try {
        const order = await getOrderById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error("Get Order Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// CREATE order
export const addOrder = async (req, res) => {
    try {
        const {
            user_id,
            total_amount,
            shipping_address
        } = req.body || {};

        if (
            user_id === undefined ||
            total_amount === undefined ||
            !shipping_address?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "User ID, total amount and shipping address are required"
            });
        }

        if (
            !Number.isInteger(Number(user_id)) ||
            Number(user_id) <= 0 ||
            !Number.isFinite(Number(total_amount)) ||
            Number(total_amount) < 0 ||
            typeof shipping_address !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid order details"
            });
        }

        const order = await createOrder(req.body);

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order
        });
    } catch (error) {
        console.error("Create Order Error:", error);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// UPDATE order
export const editOrder = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order data is required"
            });
        }

        const order = await updateOrder(req.params.id, req.body);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: order
        });
    } catch (error) {
        console.error("Update Order Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// DELETE order
export const removeOrder = async (req, res) => {
    try {
        const order = await deleteOrder(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });
    } catch (error) {
        console.error("Delete Order Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
