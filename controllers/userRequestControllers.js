import userRequest from "../models/userRequestModel.js";
import Joi from "joi";
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
export const findRequestControllerUser = async (req, res) => {
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
// Update request (OK)
export const updateRequestControllerAdmin = async (req, res) => {
    try {
        const requestId = req.body._id;
        const newListBorrowBooks = req.body.listBorrowBooks;
        const responseInfor = req.body.responseInfor;
        const status = req.body.status;
        const result1 = await userRequest.findByIdAndUpdate(
            { _id: requestId },
            {
                $set: { listBorrowBooks: [] },
            },
            { new: true }
        );
        if (result1) {
            const result2 = await userRequest.findByIdAndUpdate(
                { _id: requestId },
                {
                    $set: {
                        responseInfor: responseInfor,
                        listBorrowBooks: newListBorrowBooks,
                        status: status,
                    },
                },
                { new: true }
            );
            if (result2) {
                return res.status(200).json({
                    status: true,
                    message: "Update request succcessfully",
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
