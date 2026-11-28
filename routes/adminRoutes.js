import express from "express";

import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { getAdminDashboard } from "../controllers/adminController.js";

const router = express.Router();

router.get(
    "/dashboard",
    authenticateToken,
    authorizeRoles("admin"),
    getAdminDashboard
);

export default router;