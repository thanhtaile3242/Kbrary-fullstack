import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const { Schema } = mongoose;

const bookSchema = new mongoose.Schema(
    {
        bookName: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["AVAILABLE", "OUTOFSTOCK"],
        },
        description: {
            type: String,
        },
        imageName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

bookSchema.plugin(uniqueValidator);
const Book = mongoose.model("book", bookSchema);
export default Book;
