import express from "express";
const router = express.Router();
import {
    createCategoryController,
    deleteCategoryController,
    getAllCategoriesController,
} from "../controllers/categoryControllers.js";
// Create a new category (Role: Admin)
router.post("/create", createCategoryController);
// Delete a category
router.delete("/delete/:id", deleteCategoryController);
// Get all categories
router.get("/getAll", getAllCategoriesController);
export default router;
