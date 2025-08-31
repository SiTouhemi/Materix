import express from "express";
import {
  adminLogin,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
  adminLogout,
  getAdminDashboardStats,
} from "../controllers/admin-controller.js";
import {
  createPortfolioItem,
  getAllPortfolioItems,
  getPortfolioItemById,
  updatePortfolioItem,
  deletePortfolioItem,
  bulkDeletePortfolioItems,
  getPortfolioCategories,
  toggleFeaturedStatus,
  uploadPortfolioImage,
  deletePortfolioImage,
} from "../controllers/portfolio-controller.js";
import {
  adminAuthMiddleware,
  requirePermission,
  requireRole,
} from "../middleware/admin-auth-middleware.js";
import { uploadSingle, handleUploadError } from "../middleware/upload.js";

const router = express.Router();

// Public admin routes (no authentication required)
router.post("/login", adminLogin);

// Protected admin routes (authentication required)
router.use(adminAuthMiddleware);

// Admin profile routes
router.get("/profile", getAdminProfile);
router.put("/profile", updateAdminProfile);
router.put("/change-password", changeAdminPassword);
router.post("/logout", adminLogout);

// Admin dashboard
router.get("/dashboard/stats", getAdminDashboardStats);

// Portfolio management routes (require portfolio permission)
router.get("/portfolio", requirePermission("manage_portfolio"), getAllPortfolioItems);
router.post("/portfolio", requirePermission("manage_portfolio"), createPortfolioItem);
router.get("/portfolio/categories", requirePermission("manage_portfolio"), getPortfolioCategories);

router.get("/portfolio/:id", requirePermission("manage_portfolio"), getPortfolioItemById);
router.put("/portfolio/:id", requirePermission("manage_portfolio"), updatePortfolioItem);
router.delete("/portfolio/:id", requirePermission("manage_portfolio"), deletePortfolioItem);
router.put("/portfolio/:id/toggle-featured", requirePermission("manage_portfolio"), toggleFeaturedStatus);

// Bulk operations
router.delete("/portfolio/bulk", requirePermission("manage_portfolio"), bulkDeletePortfolioItems);

// Image upload routes
router.post("/portfolio/upload-image", requirePermission("manage_portfolio"), uploadSingle, handleUploadError, uploadPortfolioImage);
router.delete("/portfolio/delete-image", requirePermission("manage_portfolio"), deletePortfolioImage);

export default router;
