const mongoose = require("mongoose");
const yargs = require("yargs");

const connection = require("./db/connection");

const command = yargs.argv._[0];

const { addUser, addBook, checkUserHasBook, checkBookIsIn, userCheckOutBook } = require("./utils/index");

const app = async (yargsObj, command) => {
    try {
        //add a user
        if (command === 'addUser') {
            await addUser({username: yargsObj.username, has_book: false, book_title: null})
        } else if (command === 'addBook') {
            await addBook({title: yargsObj.title, is_in: true});
        } else if (command === "checkUserBook") {
            await checkUserHasBook({username: yargsObj.username});
        } else if (command === "checkBookIsIn") {
            await checkBookIsIn({title: yargsObj.title});
        } else if (command === "userCheckOutBook") {
            await userCheckOutBook(
                {username: yargsObj.username},
                {title: yargsObj.title},
                checkUserHasBook,
                checkBookIsIn
            );
        }
    } catch (error) {
        console.log(error);
    }
};

app(yargs.argv, command);