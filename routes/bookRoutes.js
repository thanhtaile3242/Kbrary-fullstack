import express from "express";
const router = express.Router();
import multer from "multer";
import { uploadBookImage } from "../middlewares/bookMiddleware.js";
import {
    createBookController,
    getAllBooksController,
    findBooksControllerDisplay,
    detailBookController,
    updateBookImageController,
    updateBookController,
    deleteBookController,
    detailBookControllerUser,
    findBooksControllerAdmin,
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
router.get("/find", findBooksControllerDisplay);
// Find books (admin role)
router.get("/findAdmin", findBooksControllerAdmin);
// Detail book
router.get("/detailBook/:id", detailBookController);
// Update book
router.put("/update", updateBookController);
// Update book image
router.put(
    "/updateImage",
    uploadBookImage.single("imageBook"),
    updateBookImageController
);
// Delete book
router.delete("/delete/:id", deleteBookController);
// Detail book
router.get("/detailBookUser/:id", detailBookControllerUser);
export default router;
