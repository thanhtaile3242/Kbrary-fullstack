import Joi from "joi";
import path from "path";
import multer from "multer";
import appRoot from "app-root-path";
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
        const result = await User.findOne({ username: username.toLowerCase() });
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
// Upload avatar Image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/public/imageUser/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = "Only image files are allowed!";
        return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
};
export const uploadUserImage = multer({
    storage: storage,
    fileFilter: imageFilter,
});
