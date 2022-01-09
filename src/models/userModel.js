const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        has_book: {
            type: Boolean,
            required: true
        },
        book_title: {
            type: String,
        }
    }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;