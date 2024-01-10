import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const { Schema } = mongoose;

const bookSchema = new mongoose.Schema(
    {
        bookName: {
            type: String,
            required: true,
        },
        searchBook: {
            type: String,
            required: true,
            index: true,
        },
        author: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "category",
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
// bookSchema.index({ bookName: "text" });

bookSchema.plugin(uniqueValidator);
const Book = mongoose.model("book", bookSchema);

export default Book;
