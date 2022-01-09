const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        is_in: {
            type: Boolean,
            required: true
        }
    }    
);

const Book = new mongoose.model("Book", bookSchema);

module.exports = Book;