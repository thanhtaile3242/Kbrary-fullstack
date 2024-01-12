import express from "express";
const router = express.Router();
import {
    createUserRequestController,
    getDetailRequestController,
    getPendingRequestController,
} from "../controllers/userRequestControllers.js";
// Create a request of user
router.post("/create", createUserRequestController);
// Get detail a request
router.get("/detailRequest/:id", getDetailRequestController);
// Get pending request
router.get("/pending", getPendingRequestController);
// // Delete a category
// router.delete("/delete/:id", deleteCategoryController);
// // Get all categories
// router.get("/getAll", getAllCategoriesController);
// // Update category
// router.put("/update", updateCategoryController);
// // Get one category
// router.get("/:id", getOneCategoryController);
export default router;
