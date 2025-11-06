import express from "express";
import { addCVE, listCVEs, deleteCVE } from "../controllers/cveController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public route — anyone can view
router.get("/cves", listCVEs, verifyToken);

// Admin routes
router.post("/cves", verifyToken, isAdmin, addCVE);
router.delete("/cves/:id", verifyToken, isAdmin, deleteCVE);

export default router;
