import Joi from "joi";
import Book from "../models/bookModel.js";
import { uploadBookImage } from "../middlewares/bookMiddleware.js";

export const createBookController = async (req, res) => {
    try {
        const schema = Joi.object({
            bookName: Joi.string().required(),
            category: Joi.string().required(),
            quantitySystem: Joi.string().min(0).required(),
            status: Joi.string().required(),
            description: Joi.string().required(),
            author: Joi.string().required(),
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
        const {
            bookName,
            category,
            quantitySystem,
            status,
            description,
            author,
        } = req.body;
        const imageName = req.file.filename;
        const newBook = {
            bookName,
            searchBook: bookName
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""),
            category,
            author,
            quantitySystem,
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
            .select("_id bookName category quantity status updatedAt");
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
export const findBooksControllerDisplay = async (req, res) => {
    try {
        const { bookName, category, status, sortField, sortOrder } = req.query;

        let order;
        if (sortOrder === "ASC") order = 1;
        else order = -1;

        let validSortField = req.query.sortField;
        if (req.query.sortField === "null") {
            validSortField = null;
        }

        const validBookName = Boolean(req.query.bookName);
        let validCategory = req.query.category;
        if (req.query.category === "null") {
            validCategory = null;
        }
        let validStatus = req.query.status;
        if (req.query.status === "null") {
            validStatus = null;
        }

        let keyword = "";
        if (validBookName) {
            keyword = bookName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        const criteria = {
            searchBook: { $regex: new RegExp(keyword, "i") },
            status,
            category,
            // quantitySystem: { $ne: 0 },
            // status: "AVAILABLE",
        };

        if (!validBookName) {
            delete criteria.searchBook;
        }
        if (!validStatus) {
            delete criteria.status;
        }
        if (!validCategory) {
            delete criteria.category;
        }

        let result;

        if (sortField === "name") {
            result = await Book.find(criteria)
                .populate({
                    path: "category",
                    select: "categoryName",
                })
                .sort({
                    searchBook: order,
                });
        }
        if (sortField === "time") {
            result = await Book.find(criteria)
                .populate({
                    path: "category",
                    select: "categoryName",
                })
                .sort({
                    updatedAt: order,
                });
        }
        if (!validSortField) {
            result = await Book.find(criteria).populate({
                path: "category",
                select: "categoryName",
            });
        }

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
//
export const findBooksControllerAdmin = async (req, res) => {
    try {
        const { bookName, category, status, sortField, sortOrder } = req.query;

        let order;
        if (sortOrder === "ASC") order = 1;
        else order = -1;

        let validSortField = req.query.sortField;
        if (req.query.sortField === "null") {
            validSortField = null;
        }

        const validBookName = Boolean(req.query.bookName);
        let validCategory = req.query.category;
        if (req.query.category === "null") {
            validCategory = null;
        }
        let validStatus = req.query.status;
        if (req.query.status === "null") {
            validStatus = null;
        }

        let keyword = "";
        if (validBookName) {
            keyword = bookName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        const criteria = {
            searchBook: { $regex: new RegExp(keyword, "i") },
            status,
            category,
        };

        if (!validBookName) {
            delete criteria.searchBook;
        }
        if (!validStatus) {
            delete criteria.status;
        }
        if (!validCategory) {
            delete criteria.category;
        }

        let result;

        if (sortField === "name") {
            result = await Book.find(criteria)
                .populate({
                    path: "category",
                    select: "categoryName",
                })
                .sort({
                    searchBook: order,
                });
        }
        if (sortField === "time") {
            result = await Book.find(criteria)
                .populate({
                    path: "category",
                    select: "categoryName",
                })
                .sort({
                    updatedAt: order,
                });
        }
        if (!validSortField) {
            result = await Book.find(criteria).populate({
                path: "category",
                select: "categoryName",
            });
        }

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
//
export const detailBookController = async (req, res) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.pramas, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const { id } = req.params;
            const result = await Book.findById(id).select(
                "bookName category quantitySystem status description imageName author"
            );
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: "Get detail book successfully",
                    data: result,
                });
            } else {
                return res.status(400).json({
                    status: true,
                    message: "Book not found",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
//
export const updateBookImageController = async (req, res) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
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
        const { id } = req.body;
        const imageName = req.file.filename;
        const result = await Book.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    imageName: imageName,
                },
            },
            { new: true }
        );
        if (result) {
            return res.status(200).json({
                status: true,
                id: result._id,
                imageName: result.imageName,
                message: "image uploaded successfully",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "image uploaded unsuccessfully",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
//
export const updateBookController = async (req, res) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
            bookName: Joi.string().required(),
            category: Joi.string().required(),
            quantitySystem: Joi.string().required(),
            status: Joi.string().required(),
            description: Joi.string().required(),
            author: Joi.string().required(),
        });
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const {
                id,
                bookName,
                category,
                quantitySystem,
                status,
                description,
                author,
            } = req.body;
            const result = await Book.findByIdAndUpdate(
                { _id: id },
                {
                    $set: {
                        bookName: bookName,
                        searchBook: bookName
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, ""),
                        category: category,
                        quantitySystem: +quantitySystem,
                        status: status,
                        author: author,
                        description: description,
                    },
                },
                { new: true }
            );
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: "Update book successfully",
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "Book not found",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
//
export const deleteBookController = async (req, res) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.pramas, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const { id } = req.params;
            const result = await Book.findByIdAndDelete({ _id: id });
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: "Delete book successfully",
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "Book not found",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};

export const detailBookControllerUser = async (req, res) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.pramas, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const { id } = req.params;
            const result = await Book.findById(id)
                .select("bookName category status description imageName author")
                .populate({
                    path: "category",
                    select: "categoryName",
                });
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: "Get detail book successfully",
                    data: result,
                });
            } else {
                return res.status(400).json({
                    status: true,
                    message: "Book not found",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
