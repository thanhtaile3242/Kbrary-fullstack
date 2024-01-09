import express from "express";
const router = express.Router();
import multer from "multer";
import { uploadBookImage } from "../middlewares/bookMiddleware.js";
import {
    createBookController,
    getAllBooksController,
    findBooksController,
    detailBookController,
    updateBookImageController,
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
// Detail book
router.get("/detailBook/:id", detailBookController);
// Update book

// Update book image
router.put(
    "/updateImage",
    uploadBookImage.single("imageBook"),
    updateBookImageController
);
export default router;
