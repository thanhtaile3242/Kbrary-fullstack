import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const { Schema } = mongoose;

const userRequestSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        requestInfor: {
            userFullname: { type: String, required: true },
            dateBorrow: {
                type: Date,
                required: true,
            },
            duration: {
                type: Number,
                required: true,
            },
            phoneNumber: {
                type: String,
                required: true,
            },
            note: { type: String, required: true },
        },
        listBorrowBooks: [
            {
                bookId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "book",
                    required: true,
                },
                quantityBorrow: {
                    type: Number,
                    required: true,
                },
                quantityAllow: {
                    type: Number,
                    default: null,
                    required: false,
                },
                detalQuantity: {
                    type: Number,
                    default: null,
                    required: false,
                },
            },
        ],
        responseInfor: {
            allowDate: {
                type: Date,
                default: null,
                required: false,
            },
            allowNote: {
                type: String,
                default: null,
                required: false,
            },
            allowDuration: {
                type: Number,
                default: null,
                required: false,
            },
        },
        status: {
            type: String,
            required: true,
            enum: ["DONE", "INPROGRESS", "BORROWED", "RECEIVED"],
        },
        isProgressing: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userRequestSchema.plugin(uniqueValidator);
const Resquest = mongoose.model("userrequest", userRequestSchema);
export default Resquest;
