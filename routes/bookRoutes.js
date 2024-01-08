import express from "express";
const router = express.Router();
import multer from "multer";
import { uploadBookImage } from "../middlewares/bookMiddleware.js";
import {
    createBookController,
    getAllBooksController,
    findBooksController,
} from "../controllers/bookControllers.js";
// Create a new book (Role: Admin)
router.post(
    "/create",
    uploadBookImage.single("imageBook"),
    createBookController
);
// Get all books
router.get("/getAll", getAllBooksController);
// Find books
router.get("/find", findBooksController);
export default router;
