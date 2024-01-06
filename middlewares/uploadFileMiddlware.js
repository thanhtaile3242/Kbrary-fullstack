import multer from "multer";
import path from "path";
import appRoot from "app-root-path";
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
