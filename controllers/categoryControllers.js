import Joi from "joi";
import Category from "../models/categoryModel.js";
export const createCategoryController = async (req, res) => {
    try {
        const schema = Joi.object({
            categoryName: Joi.string().required(),
        });
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const { categoryName } = req.body;
            const result = await Category.create({
                categoryName,
            });
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: "Create a new category successfully",
                    data: {
                        id: result._id,
                        category: result.categoryName,
                    },
                });
            } else {
                return res.status(500).json({
                    status: false,
                    message: "Can not create a category",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
export const deleteCategoryController = async (req, res) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const { id } = req.params;
            const result = await Category.findByIdAndDelete(id);
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: "Delete category successfully",
                });
            } else {
                return res.status(500).json({
                    status: false,
                    message: "Can not delete a category",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
export const getAllCategoriesController = async (req, res) => {
    try {
        const result = await Category.find({})
            .sort({ createdAt: "desc" })
            .select("_id categoryName");
        return res.status(200).json({
            status: true,
            message: "Get all categories successfully",
            data: result,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
export const updateCategoryController = async (req, res) => {
    try {
        const { id, updateCategory } = req.body;
        const result = await Category.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    categoryName: updateCategory,
                },
            },
            { new: true }
        );
        if (result) {
            return res.status(200).json({
                status: true,
                message: "Update category successfully",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Can not update category",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};
//
export const getOneCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Category.findById({ _id: id });
        if (result) {
            return res.status(200).json({
                status: true,
                message: "Get one category successfully",
                data: result,
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Can not get one category",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};
