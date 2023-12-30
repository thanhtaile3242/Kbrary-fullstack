import User from "../models/userModel.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import Redis from "ioredis";
const redis = new Redis();
function generateSixDigitRandom() {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}
export const signUpController = async (req, res) => {
    try {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(20).required(),

            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ["com", "net"] },
                })
                .required(),

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
            const { username, email, password } = req.body;
            const codeEmail = generateSixDigitRandom();
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                username: username,
                email: email,
                password: hashedPassword,
                role: "USER",
                codeVerify: {
                    codeEmail: codeEmail,
                },
            };
            const result = await User.create(newUser);
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: "Create an account successfully",
                    data: {
                        username: result.username,
                        email: result.email,
                    },
                });
            } else {
                return res.status(500).json({
                    status: false,
                    message: "Can not create a new account",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ status: false, message: "Insernal Server Error" });
    }
};

export const sendOTPEmailController = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ["com", "net"] },
                })
                .required(),
        });
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const { email } = req.body;
            const result = await User.findOne({ email: email });
            if (result) {
                const { codeVerify } = result;
                const codeEmail = codeVerify.codeEmail;
                const html = `Here is your one-time verification code (${codeEmail}). Please use this code within the next 5 minutes to verify your email address`;
                sendEmail(email, html);
                return res.status(200).json({
                    status: true,
                    message: "Email is sent !!!",
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "User not found",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: `Internal server error: ${error.message}`,
        });
    }
};

export const verifyOTPEmailController = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ["com", "net"] },
                })
                .required(),
            codeEmail: Joi.string().required(),
        });
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const { email, codeEmail } = req.body;
            const user = await User.findOne({
                email: email,
            });
            if (user) {
                const updatedUser = await User.findOneAndUpdate(
                    { email: email, isValidEmail: false },
                    {
                        $set: {
                            isValidEmail: true,
                            "codeVerify.codeEmail": null,
                        },
                    },
                    { new: true }
                );
                return res
                    .status(200)
                    .json({ status: true, message: "Email is valid" });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "Incorrect OTP code",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: `Internal server error: ${error.message}`,
        });
    }
};

export const signInController = async (req, res) => {
    const username = req.userInfo.username;
    const email = req.userInfo.email;
    const role = req.userInfo.role;
    const maxAttempts = parseInt(5, 10);
    const lockoutTime = parseInt(120, 10);
    const lockoutKey = `lockout: ${username}`;
    const attemptsKey = `attempts: ${username}`;
    //
    const systemPassword = req.userInfo.password;
    const clientPassword = req.body.password;

    const isLock = await redis.get(lockoutKey);
    if (isLock) {
        const remainingTime = await redis.ttl(lockoutKey);
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        if (remainingTime > 0 && minutes > 0) {
            return res.status(403).json({
                status: "fail",
                message: `Account is locked. Please try again after ${minutes} minutes and ${seconds} seconds`,
            });
        }
        if (remainingTime > 0 && minutes <= 0) {
            return res.status(403).json({
                status: "fail",
                message: `Account is locked. Please try again after ${seconds} seconds.`,
            });
        } else {
            await redis.del(lockoutKey, attemptsKey);
        }
    }

    // Check of matching password
    const isMatch = await bcrypt.compare(clientPassword, systemPassword);

    if (isMatch) {
        await redis.del(attemptsKey);
        //
        const payload = {
            username: username,
            email: email,
        };
        // Generate access_token and refresh_token
        const access_token = jwt.sign(payload, "LTT-secret-key-access", {
            expiresIn: 2592000,
        });
        const refresh_token = jwt.sign(payload, "LTT-secret-key-refresh", {
            expiresIn: 2592000 * 2,
        });

        // Save refresh_token into database
        await User.findOneAndUpdate(
            { username: username, email: email },
            { $set: { refresh_token: refresh_token } }
        );

        // Set refresh_token as Cookie
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            maxAge: 2592000 * 2,
        });
        // Return for client-side
        return res.status(200).json({
            status: true,
            message: "Sign in successfully",
            data: { ...{ access_token, role }, ...payload },
        });
    } else {
        let attempts = await redis.incr(attemptsKey);
        if (attempts === maxAttempts) {
            // Lock the account and set a timer
            await redis.setex(lockoutKey, lockoutTime, "locked");
        }
        return res.status(401).json({
            status: "fail",
            message: "Wrong password",
        });
    }
};

export const logOutController = async (req, res) => {
    try {
        const userId = req.body.id;
        const result = await User.findByIdAndUpdate(
            userId,
            {
                refresh_token: null,
            },

            { new: true }
        );
        res.clearCookie("refresh_token");
        if (result) {
            return res.status(200).json({
                status: true,
                message: "Log out successfully",
            });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ status: false, message: "Insernal Server Error" });
    }
};
// Reset password
export const sendOTPResetPasswordController = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ["com", "net"] },
                })
                .required(),
        });
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const { email } = req.body;
            const result = await User.findOne({ email: email });
            if (result) {
                const { codeVerify } = result;
                const codeEmail = codeVerify.codeEmail;
                const html = `Here is your one-time verification code (${codeEmail}). Please use this code within the next 5 minutes to verify your email address`;
                sendEmail(email, html);
                return res.status(200).json({
                    status: true,
                    message: "Email is sent !!!",
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "User not found",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: `Internal server error: ${error.message}`,
        });
    }
};
