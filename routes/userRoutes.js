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
router.post("/resetPassword", resetPasswordController);
export default router;
