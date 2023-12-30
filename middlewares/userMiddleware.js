import Joi from "joi";
import User from "../models/userModel.js";
// Sign In
export const validateSignInData = async (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
    });
    const { error } = schema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        return res.status(500).json({ status: false, message: error });
    } else {
        const { username, password } = req.body;
        const result = await User.findOne({ username: username });
        if (result) {
            req.userInfo = result;
            next();
        } else {
            return res
                .status(500)
                .json({ status: false, message: "Incorrect username" });
        }
    }
};
