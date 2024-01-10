import express from "express";
const router = express.Router();
import {
    createCategoryController,
    deleteCategoryController,
    getAllCategoriesController,
    updateCategoryController,
    getOneCategoryController,
} from "../controllers/categoryControllers.js";
// Create a new category (Role: Admin)
router.post("/create", createCategoryController);
// Delete a category
router.delete("/delete/:id", deleteCategoryController);
// Get all categories
router.get("/getAll", getAllCategoriesController);
// Update category
router.put("/update", updateCategoryController);
// Get one category
router.get("/:id", getOneCategoryController);
export default router;
