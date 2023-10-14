const mongoose = require("mongoose");

//create book schema
const BookSchema = mongoose.Schema(
    {
        ISBN: String,
        title: String,
        Pubdate: String,
        language: [String],
        publication: [Number],
        author: [Number],
        numpage: Number,
        category: [String]
    }
);

const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel