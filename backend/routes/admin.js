import express from "express";
import {
  adminLogin,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
  adminLogout,
  getAdminDashboardStats,
  getAllUsers,
  approveUser,
  promoteToAdmin,
  demoteToViewer,
  getUserStats,
  getAllWorkspaces,
  getUserWorkspaceAssignments,
  assignWorkspaceToUser,
  removeWorkspaceAssignment,
  getWorkspaceAssignmentStats,
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
import { validateRequest } from "zod-express-middleware";
import { workspaceAssignmentSchema } from "../libs/validate-schema.js";

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

// Portfolio management routes (require portfolio permission or admin role)
router.get("/portfolio", requireRole(["admin", "super_admin"]), getAllPortfolioItems);
router.post("/portfolio", requireRole(["admin", "super_admin"]), createPortfolioItem);
router.get("/portfolio/categories", requireRole(["admin", "super_admin"]), getPortfolioCategories);

router.get("/portfolio/:id", requireRole(["admin", "super_admin"]), getPortfolioItemById);
router.put("/portfolio/:id", requireRole(["admin", "super_admin"]), updatePortfolioItem);
router.delete("/portfolio/:id", requireRole(["admin", "super_admin"]), deletePortfolioItem);
router.put("/portfolio/:id/toggle-featured", requireRole(["admin", "super_admin"]), toggleFeaturedStatus);

// Bulk operations
router.delete("/portfolio/bulk", requireRole(["admin", "super_admin"]), bulkDeletePortfolioItems);

// Image upload routes
router.post("/portfolio/upload-image", requireRole(["admin", "super_admin"]), uploadSingle, handleUploadError, uploadPortfolioImage);
router.delete("/portfolio/delete-image", requireRole(["admin", "super_admin"]), deletePortfolioImage);

// User management routes (require admin or super_admin role)
router.get("/users", requireRole(["admin", "super_admin"]), getAllUsers);
router.get("/users/stats", requireRole(["admin", "super_admin"]), getUserStats);
router.patch("/users/:userId/approve", requireRole(["admin", "super_admin"]), approveUser);
router.patch("/users/:userId/promote", requireRole(["admin", "super_admin"]), promoteToAdmin);
router.patch("/users/:userId/demote", requireRole(["admin", "super_admin"]), demoteToViewer);

// Workspace management routes (require admin or super_admin role)
router.get("/workspaces", requireRole(["admin", "super_admin"]), getAllWorkspaces);
router.get("/workspaces/stats", requireRole(["admin", "super_admin"]), getWorkspaceAssignmentStats);

// User workspace assignment routes (require admin or super_admin role)
router.get("/users/:userId/workspaces", requireRole(["admin", "super_admin"]), getUserWorkspaceAssignments);
router.post("/users/:userId/workspaces", requireRole(["admin", "super_admin"]), validateRequest({ body: workspaceAssignmentSchema }), assignWorkspaceToUser);
router.delete("/users/:userId/workspaces/:workspaceId", requireRole(["admin", "super_admin"]), removeWorkspaceAssignment);

export default router;
