import Joi from "joi";
import Book from "../models/bookModel.js";
import { uploadBookImage } from "../middlewares/bookMiddleware.js";

export const createBookController = async (req, res) => {
    try {
        const schema = Joi.object({
            bookName: Joi.string().required(),
            category: Joi.string().required(),
            quantity: Joi.string().min(0).required(),
            status: Joi.string().required(),
            description: Joi.string().required(),
        });
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        }
        if (!req.file) {
            return res
                .status(500)
                .json({ status: false, message: "Image file required" });
        }
        const { bookName, category, quantity, status, description } = req.body;
        const imageName = req.file.filename;
        const newBook = {
            bookName,
            category,
            quantity,
            status,
            description,
            imageName,
        };
        const result = await Book.create(newBook);
        if (result) {
            return res.status(200).json({
                status: true,
                message: "Create a book successfully",
            });
        } else {
            return res
                .status(400)
                .json({ status: false, message: "Can not create a book" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
//
export const getAllBooksController = async (req, res) => {
    try {
        const result = await Book.find({})
            .sort({ updatedAt: "desc" })
            .select("_id bookName category quantity status");
        if (result) {
            return res.status(200).json({
                status: true,
                message: "Get all books successfully",
                data: result,
            });
        } else {
            return res.status(400).json({
                status: true,
                message: "Can not get all books",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};
//
export const findBooksController = async (req, res) => {
    try {
        const { bookName, category, status } = req.query;
        const criteria = {
            bookName: { $regex: new RegExp(bookName, "i") },
            status,
            category,
        };
        if (!bookName) {
            delete criteria.bookName;
        }
        if (!status) {
            delete criteria.status;
        }
        if (!category) {
            delete criteria.category;
        }

        const result = await Book.find(criteria);
        if (result) {
            return res.status(200).json({
                status: true,
                message: "Find books successfully",
                data: result,
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Can not find books",
                data: result,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};
