import userRequest from "../models/userRequestModel.js";
import Joi from "joi";
//
export const createUserRequestController = async (req, res) => {
    try {
        const schema = Joi.object({
            userId: Joi.string().required(),
            listBorrowBooks: Joi.array()
                .items(
                    Joi.object({
                        bookId: Joi.string().required(),
                        quantityBorrow: Joi.number()
                            .integer()
                            .min(1)
                            .required(),
                    })
                )
                .required(),
            status: Joi.string().required(),
        });
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const newRequest = req.body;
            const result = await userRequest.create(newRequest);
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: "Create a request successfully",
                    data: result,
                });
            } else {
                return res.status(400).json({
                    status: true,
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
                .populate("userId", "username")
                .populate({
                    path: "listBorrowBooks.bookId",
                    select: "bookName quantitySystem",
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
        const result = await userRequest
            .findOne({ status: "PENDING" })
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
                message: "Get detail pending request uccessfully",
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
