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
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
            required: true,
        },
        quantitySystem: {
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
bookSchema.pre("findOneAndUpdate", async function (next) {
    const { quantitySystem } = this._update.$set;
    if (quantitySystem !== undefined && quantitySystem === 0) {
        this._update.$set = this._update.$set || {};
        this._update.$set.status = "OUTOFSTOCK";
    }
    next();
});
const Book = mongoose.model("book", bookSchema);

export default Book;
