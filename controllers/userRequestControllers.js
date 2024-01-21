import userRequest from "../models/userRequestModel.js";
import Book from "../models/bookModel.js";
import Joi from "joi";
import { ObjectId } from "mongodb";
//
export const createUserRequestController = async (req, res) => {
    try {
        const userInformationSchema = Joi.object({
            userFullname: Joi.string().required(),
            dateBorrow: Joi.date().required(),
            duration: Joi.number().required(),
            phoneNumber: Joi.string().required(),
            note: Joi.string().required(),
        });

        const bookSchema = Joi.object({
            bookId: Joi.object().required(), // Assuming bookId is a string, you can adjust as needed
            quantityBorrow: Joi.number().required(),
        });

        const userRequestSchema = Joi.object({
            userId: Joi.string().required(), // Assuming userId is a string, you can adjust as needed
            requestInfor: userInformationSchema.required(),
            listBorrowBooks: Joi.array().items(bookSchema).required(),
            status: Joi.string().valid("DONE", "INPROGRESS").required(),
        });
        const { error } = userRequestSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const listBorrowBooks = req.body.listBorrowBooks;
            listBorrowBooks.forEach((book) => {
                book.bookId = book.bookId._id;
            });

            const newRequest = {
                ...req.body,
                listBorrowBooks: listBorrowBooks,
            };

            const result = await userRequest.create(newRequest);
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: "Create a request successfully",
                    data: result,
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "Can not create a user request",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
//
export const getDetailRequestController = async (req, res) => {
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
            const id = req.params.id;
            const result = await userRequest
                .findById(id)
                .populate("userId", "email")
                .populate({
                    path: "listBorrowBooks.bookId",
                    populate: {
                        path: "category",
                        model: "category",
                        select: "categoryName -_id",
                    },
                    select: "bookName category imageName quantitySystem",
                });

            if (result) {
                return res.status(200).json({
                    status: true,
                    message: "Get detail request uccessfully",
                    data: result,
                });
            } else {
                return res.status(400).json({
                    status: true,
                    message: "Request not found",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
//
export const getPendingRequestController = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userRequest
            .find({ userId: userId, status: "PENDING" })
            .populate({
                path: "userId",
                select: "username -_id",
            })
            .populate({
                path: "listBorrowBooks.bookId",
                populate: {
                    path: "category",
                    model: "category",
                    select: "categoryName",
                },
                select: "bookName category imageName",
            });

        if (result) {
            return res.status(200).json({
                status: true,
                message: "Get detail pending request succcessfully",
                data: result,
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Request not found",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
//
export const updatePendingRequestController = async (req, res) => {
    try {
        const requestId = req.body.requestId;
        const newListBorrow = req.body.listBorrowBooks;
        const result1 = await userRequest.findByIdAndUpdate(
            { _id: requestId },
            { $set: { listBorrowBooks: [] } }
        );
        if (result1) {
            const result2 = await userRequest.findByIdAndUpdate(
                { _id: requestId },

                { $set: { listBorrowBooks: newListBorrow } },
                { new: true }
            );
            if (result2) {
                return res.status(200).json({
                    status: true,
                    message: "Update pending request succcessfully",
                    data: result2,
                });
            } else {
                return res.status(500).json({
                    status: false,
                    message: "Can not update pending request",
                });
            }
        } else {
            return res.status(500).json({
                status: false,
                message: "Can not update pending request",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
//
export const updatePendingRequestWithUserID = async (req, res) => {
    try {
        const userId = req.body.userId;
        const newListBorrow = req.body.listBorrowBooks;
        const result1 = await userRequest.findOneAndUpdate(
            { userId: userId },
            { $set: { listBorrowBooks: [] } }
        );
        if (result1) {
            const result2 = await userRequest.findOneAndUpdate(
                { userId: userId },
                { $set: { listBorrowBooks: newListBorrow } },
                { new: true }
            );
            if (result2) {
                return res.status(200).json({
                    status: true,
                    message: "Update pending request succcessfully",
                    data: result2,
                });
            } else {
                return res.status(500).json({
                    status: false,
                    message: "Can not update pending request",
                });
            }
        } else {
            return res.status(500).json({
                status: false,
                message: "Can not update pending request",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};

// (OK)
export const findRequestController = async (req, res) => {
    try {
        const { status, sortField, sortOrder, userId } = req.query;

        let order;
        if (sortOrder === "ASC") order = 1;
        else order = -1;

        let validStatus = req.query.status;
        if (req.query.status === "null") {
            validStatus = null;
        }

        const criteria = {
            status,
            userId,
        };
        if (!userId) {
            delete criteria.userId;
        }
        if (!validStatus) {
            delete criteria.status;
        }

        const result = await userRequest
            .find(criteria)
            .populate({
                path: "userId",
                select: "username -_id",
            })
            .sort({ createdAt: order });

        if (result) {
            return res.status(200).json({
                status: true,
                message: "Find requests successfully",
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
// Update request (OK) - Admin role
export const updateRequestControllerAdmin = async (req, res) => {
    try {
        // Update quantitySystem for each book
        const listBorrowBooks = req.body.listBorrowBooks;
        for (const book of listBorrowBooks) {
            const bookId = book.bookId._id;
            const detailQuantity = book.detalQuantity;
            try {
                const result1 = await Book.findOneAndUpdate(
                    { _id: bookId },
                    {
                        $set: {
                            quantitySystem: detailQuantity,
                        },
                    },
                    { new: true }
                );
            } catch (error) {
                console.log(error);
                return res.status(400).json({
                    status: false,
                    message: error.message,
                });
            }
        }
        const requestId = req.body._id;
        const status = req.body.status;
        const result2 = await userRequest.findByIdAndUpdate(
            { _id: requestId },
            {
                $set: { listBorrowBooks: [] },
            },
            { new: true }
        );
        if (result2) {
            const result3 = await userRequest.findByIdAndUpdate(
                { _id: requestId },
                {
                    $set: {
                        responseInfor: {
                            allowDate: req.body.dateAllow,
                            allowDuration: req.body.durationAllow,
                            allowNote: req.body.noteAllow,
                        },
                        listBorrowBooks: listBorrowBooks,
                        status: status,
                    },
                },
                { new: true }
            );
            if (result3) {
                return res.status(200).json({
                    status: true,
                    message: "Update request succcessfully",
                    data: result3,
                });
            } else {
                return res.status(500).json({
                    status: false,
                    message: "Can not update pending request",
                });
            }
        } else {
            return res.status(500).json({
                status: false,
                message: "Can not update request",
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
// Update progress
export const updateProgressController = async (req, res) => {
    const { idRequest, isProgressing } = req.body;
    try {
        const result = await userRequest.findByIdAndUpdate(
            { _id: idRequest },
            {
                $set: {
                    isProgressing: isProgressing,
                },
            }
        );
        if (result) {
            return res.status(200).json({
                status: true,
                message: "Get detail request uccessfully",
                data: result,
            });
        } else {
            return res.status(400).json({
                status: true,
                message: "Request not found",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
// Update request - User role
export const updateRequestControllerUser = async (req, res) => {
    const { idRequest, newRequestInfor, newListBook } = req.body;
    try {
        await userRequest.findByIdAndUpdate(
            { _id: idRequest },
            {
                $set: {
                    requestInfor: newRequestInfor,
                    listBorrowBooks: newListBook,
                },
            },
            { new: true }
        );
        return res.status(200).json({
            status: true,
            message: "Update request succcessfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};
