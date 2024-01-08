import express from "express";
const router = express.Router();
import {
    signUpController,
    verifyOTPEmailController,
    signInController,
    logOutController,
    sendOTPEmailController,
    sendOTPResetController,
    verifyOTPResetController,
    resetPasswordController,
    createUserController,
    getAllUserController,
    getDetailUserController,
    updateUserController,
    deleteUserController,
    uploadUserImageController,
    resetPasswordController2,
} from "../controllers/userControllers.js";
import {
    validateSignInData,
    uploadUserImage,
} from "../middlewares/userMiddleware.js";
// Sign up
router.post("/signup", signUpController);
// Send OTP (email)
router.post("/sendOTPEmail", sendOTPEmailController);
// Verify OTP (email)
router.post("/verifyOTPEmail", verifyOTPEmailController);
// Sign in
router.post("/signin", validateSignInData, signInController);
// Log out
router.post("/logout", logOutController);
// Send OTP (reset password)
router.post("/sendOTPReset", sendOTPResetController);
// Verify OTP (reset password)
router.post("/verifyOTPReset", verifyOTPResetController);
// Reset password 1 (without current password)
router.put("/resetPassword", resetPasswordController);
// Reset password 2 (with current password)
router.put("/resetPassword2", resetPasswordController2);

// Admin role
router.post("/create", createUserController);
// *
router.get("/getAll/:role", getAllUserController);
router.get("/detailUser/:id", getDetailUserController);
router.put("/updateUser", updateUserController);
router.delete("/deleteUser/:id", deleteUserController);
// Upload file image
router.post(
    "/uploadUserImage",
    uploadUserImage.single("avatar"),
    uploadUserImageController
);

export default router;
