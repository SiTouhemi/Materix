import express from "express";
import {
  getPublicPortfolioItems,
  getFeaturedPortfolioItems,
  getPublicPortfolioItemById,
  getPublicPortfolioCategories,
  getPublicPortfolioStats,
} from "../controllers/public-portfolio-controller.js";

const router = express.Router();

// Public portfolio routes (no authentication required)
router.get("/", getPublicPortfolioItems);
router.get("/featured", getFeaturedPortfolioItems);
router.get("/categories", getPublicPortfolioCategories);
router.get("/stats", getPublicPortfolioStats);
router.get("/:id", getPublicPortfolioItemById);

export default router;
