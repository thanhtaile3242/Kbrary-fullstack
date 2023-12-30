import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
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

const User = mongoose.model("user", userSchema);
export default User;
