import express from "express";
const router = express.Router();
import {
    signUpController,
    verifyOTPEmailController,
    signInController,
    logOutController,
    sendOTPEmailController,
} from "../controllers/userControllers.js";
import { validateSignInData } from "../middlewares/userMiddleware.js";
// Sign up
router.post("/signup", signUpController);
// Send OTP email
router.post("/sendOTP", sendOTPEmailController);
// Verify OTP email
router.post("/verifyEmail", verifyOTPEmailController);
// Sign in
router.post("/signin", validateSignInData, signInController);
// Log out
router.post("/logout", logOutController);
export default router;
