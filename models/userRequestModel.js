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
        userFullname: { type: String, required: true },
        dateBorrow: {
            type: Date,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        note: { type: String, required: true },
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
            },
        ],
        status: {
            type: String,
            required: true,
            enum: ["PENDING", "INPROGRESS", "FAIL", "SUCCESS"],
        },
    },
    {
        timestamps: true,
    }
);

userRequestSchema.plugin(uniqueValidator);
const Resquest = mongoose.model("userrequest", userRequestSchema);
export default Resquest;
