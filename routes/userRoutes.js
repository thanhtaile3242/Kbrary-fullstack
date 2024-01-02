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
} from "../controllers/userControllers.js";
import { validateSignInData } from "../middlewares/userMiddleware.js";
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
// Reset password
router.put("/resetPassword", resetPasswordController);

// Admin feature
router.post("/create", createUserController);
router.get("/getAll", getAllUserController);
router.get("/detailUser/:id", getDetailUserController);
router.put("/updateUser", updateUserController);
router.delete("/deleteUser/:id", deleteUserController);
export default router;
