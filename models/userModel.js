import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const { Schema } = mongoose;
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["ADMIN", "USER"],
        },
        avatarName: {
            type: String,
            default: null,
        },
        isValidEmail: {
            type: Boolean,
            required: false,
            default: 0,
        },
        codeVerify: {
            codeEmail: {
                type: String,
                default: null,
            },
            codeResetPassword: {
                type: String,
                default: null,
            },
        },
        refresh_token: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);
userSchema.plugin(uniqueValidator);
const User = mongoose.model("user", userSchema);
export default User;
