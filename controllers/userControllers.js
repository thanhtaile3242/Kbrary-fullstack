import User from "../models/userModel.js";
import Joi from "joi";
import multer from "multer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import Redis from "ioredis";
import {
    uploadUserImage,
    validateSignInData,
} from "../middlewares/userMiddleware.js";
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

            role: Joi.string().required(),
        });
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const { username, email, password, role } = req.body;
            const codeEmail = generateSixDigitRandom();
            const codeResetPassword = generateSixDigitRandom();
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password: hashedPassword,
                role: role,
                codeVerify: {
                    codeEmail: codeEmail,
                    codeResetPassword: codeResetPassword,
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
        return res.status(500).json({ status: false, message: error.message });
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
                const html = `Here is your one-time verification code <b>${codeEmail}</b>. Please use this code within the next 5 minutes to verify your email address`;
                sendEmail(email, html);
                return res.status(200).json({
                    status: true,
                    message: "Code verify email is sent !!!",
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
                const codeEmailSystem = user.codeVerify.codeEmail;
                if (codeEmailSystem === codeEmail) {
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
                    return res
                        .status(400)
                        .json({ status: false, message: "OTP is unmatching" });
                }
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
    const { username, email, avatarName, role, _id } = req.userInfo;
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
            id: _id,
            username: username,
            email: email,
            avatarName: avatarName,
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
//
export const sendOTPResetController = async (req, res) => {
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
                const codeResetPassword = codeVerify.codeResetPassword;
                const html = `Here is your one-time verification code <b>${codeResetPassword}</b>. Please use this code within the next 5 minutes to reset your password`;
                sendEmail(email, html);
                return res.status(200).json({
                    status: true,
                    message: "Code reset password is sent !!!",
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
//
export const verifyOTPResetController = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ["com", "net"] },
                })
                .required(),
            codeResetPassword: Joi.string().required(),
        });
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const { email, codeResetPassword } = req.body;
            const user = await User.findOne({
                email: email,
            });
            if (user) {
                const codeResetPasswordSystem =
                    user.codeVerify.codeResetPassword;
                if (codeResetPasswordSystem === codeResetPassword) {
                    const newCodeRest = generateSixDigitRandom();
                    const updatedUser = await User.findOneAndUpdate(
                        { email: email },
                        {
                            $set: {
                                "codeVerify.codeResetPassword": newCodeRest,
                            },
                        },
                        { new: true }
                    );
                    return res.status(200).json({
                        status: true,
                        message: "Code reset password is valid",
                    });
                } else {
                    return res
                        .status(400)
                        .json({ status: false, message: "OTP is unmatching" });
                }
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
//
export const resetPasswordController = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ["com", "net"] },
                })
                .required(),
            newPassword: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        });
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const { email, newPassword, confirmPassword } = req.body;
            const result = await User.findOne({ email: email });
            if (result) {
                if (newPassword === confirmPassword) {
                    const hashedPassword = await bcrypt.hash(newPassword, 10);

                    await User.findOneAndUpdate(
                        { email: email },
                        {
                            $set: {
                                password: hashedPassword,
                            },
                        }
                    );
                    return res.status(200).json({
                        status: true,
                        message: "Password is reset successfully",
                    });
                } else {
                    return res.status(400).json({
                        status: false,
                        message: "Unmatching password",
                    });
                }
            } else {
                return res.status(400).json({
                    status: false,
                    message: "User not found",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
//
export const resetPasswordController2 = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ["com", "net"] },
                })
                .required(),
            currentPassword: Joi.string().required(),
            newPassword: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        });
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const { email, newPassword, confirmPassword, currentPassword } =
                req.body;
            if (newPassword !== confirmPassword) {
                return res.status(400).json({
                    status: false,
                    message: "Unmatching Password",
                });
            }
            const result = await User.findOne({ email: email });
            if (result) {
                const systemPassword = result.password;
                const isMatch = await bcrypt.compare(
                    currentPassword,
                    systemPassword
                );
                if (isMatch) {
                    const hashedPassword = await bcrypt.hash(newPassword, 10);
                    await User.findOneAndUpdate(
                        { email: email },
                        {
                            $set: {
                                password: hashedPassword,
                            },
                        }
                    );
                    return res.status(200).json({
                        status: true,
                        message: "Password is reset successfully",
                    });
                } else {
                    return res.status(400).json({
                        status: false,
                        message: "Incorrect current password",
                    });
                }
            } else {
                return res.status(400).json({
                    status: false,
                    message: "User not found",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
//
export const createUserController = async (req, res) => {
    try {
        // Validate
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

            role: Joi.string().required(),
        });
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const { username, email, password, role } = req.body;
            const codeResetPassword = generateSixDigitRandom();
            const codeEmail = generateSixDigitRandom();
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                username: username,
                email: email.toLowerCase(),
                password: hashedPassword,
                role: role,
                codeVerify: {
                    codeEmail: codeEmail,
                    codeResetPassword: codeResetPassword,
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
        return res.status(500).json({ status: false, message: error.message });
    }
};
//
export const getAllUserController = async (req, res) => {
    try {
        const role = req.params.role;
        const result = await User.find({ role: role })
            .sort({ updatedAt: "desc" })
            .select("_id username email role");
        if (result) {
            return res.status(200).json({
                status: true,
                message: "Get all user successfully",
                data: result,
            });
        } else {
            return res.status(400).json({
                status: true,
                message: "Can not get all users",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
//
export const getDetailUserController = async (req, res) => {
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
            const { id } = req.params;
            const result = await User.findById(id).select(
                "username email role codeVerify avatarName"
            );

            if (result) {
                return res.status(200).json({
                    status: true,
                    message: "Get detail successfully",
                    data: result,
                });
            } else {
                return res.status(400).json({
                    status: true,
                    message: "User not found",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
//
export const updateUserController = async (req, res) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
            username: Joi.string().alphanum().min(3).max(20).required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ["com", "net"] },
                })
                .required(),
            role: Joi.string().required(),
        });
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(500).json({ status: false, message: error });
        } else {
            const { id, email, username, role } = req.body;
            const result = await User.findByIdAndUpdate(
                { _id: id },
                {
                    $set: {
                        email: email.toLowerCase(),
                        username: username,
                        role: role,
                    },
                },
                { new: true }
            );
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: "Update user successfully",
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
        return res.status(500).json({ status: false, message: error.message });
    }
};
//
export const deleteUserController = async (req, res) => {
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
            const { id } = req.params;
            const result = await User.findByIdAndDelete({ _id: id });
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: "Delete user successfully",
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
        return res.status(500).json({ status: false, message: error.message });
    }
};
//
export const uploadUserImageController = async (req, res) => {
    try {
        const { email } = req.body;
        uploadUserImage.single("avatar")(req, res, function (err) {
            if (req.fileValidationError) {
                return res.status(400).json({
                    status: false,
                    message: req.fileValidationError,
                });
            } else if (!req.file) {
                return res.status(400).json({
                    status: false,
                    message: "Please select an image to upload",
                });
            } else if (err instanceof multer.MulterError) {
                return res.status(500).json({
                    status: false,
                    message:
                        err.message || "An error occurred during file upload",
                });
            } else if (err) {
                return res.status(500).json({
                    status: false,
                    message:
                        err.message || "An error occurred during file upload",
                });
            }
        });
        // Save filename into database via email
        const fileName = req.file.filename;
        const result = await User.findOneAndUpdate(
            { email: email },
            {
                $set: {
                    avatarName: fileName,
                },
            },
            { new: true }
        );
        if (result) {
            return res.status(200).json({
                status: true,
                email: email,
                filename: result.avatarName,
                message: "Avatar uploaded successfully",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Avatar uploaded unsuccessfully",
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message || "Internal Server Error",
        });
    }
};
