const mongoose = require("mongoose");
const User = require("../models/userModel");
const Book = require("../models/bookModel");

// adds user to db
const addUser = async (userObj) => {
    try {
        const newUser = new User(userObj);
        await newUser.save();
        console.log(newUser);
    } catch (error) {   
        console.log(error);
    }
};

const addBook = async (bookObj) => {
    try {
        const newBook = new Book(bookObj);
        await newBook.save();
        console.log(newBook);
    } catch (error) {
        console.log(error);
    }
};

const checkUserHasBook = async (userObj) => {
    try {
        //return promise 
        const user = await User.findOne(userObj).exec();
        if (user.has_book === false) {
            console.log(`${user.username} does not have a book out on loan.`);
            return user;
        } else if (user.has_book === true) {
            console.log(`${user.username} has a ${user.book_title} out on loan, and cannot take another.`);
            return user;
        }
    } catch (error) {
        console.log(error);
    }
};

const checkBookIsIn = async (bookObj) => {
    try {
        const book = await Book.findOne(bookObj).exec();
        
        if (book.is_in === true) {
            console.log(`"${book.title}" is available.`);
            return book;
        } else if (book.is_in === false) {
            console.log(`${book.title} it not available.`);
            return book;
        }   
    } catch (error) {   
        console.log(error);
    }
};

const userCheckOutBook = async (userObj, bookObj, checkUserHasBook, checkBookIsIn) => {
    try {
        const userHasBook = await checkUserHasBook(userObj);
        const bookIsIn = await checkBookIsIn(bookObj);

        if (userHasBook.has_book === true) {
            console.log(`${userHasBook.username} has a book on loan.`);
        } else if (bookIsIn.is_in === false) {
            console.log(`${bookIsIn.title} has already been checked out.`);
        } else if (userHasBook.has_book === false && bookIsIn.is_in === true) {
            await User.updateOne({username: userObj.username}, {has_book: true, book_title: bookObj.title});
            await Book.updateOne({title: bookObj.title}, {is_in: false});
            console.log(`${userHasBook.username} has checked out ${bookIsIn.title}.`);
        } 

    } catch (error) {
        console.log(error);
    }
};



module.exports = {
    addUser,
    addBook,
    checkUserHasBook,
    checkBookIsIn,
    userCheckOutBook
};