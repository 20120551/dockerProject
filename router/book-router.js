const express = require('express')
const {bookController} = require('./../controller');
const {authenticateMiddleware} = require('./../middleware');
const router = express.Router()

router
    .route('/')
    //get all books
    .get(bookController.getAllBooks)
    //create new book
    .post(authenticateMiddleware.checkUser, bookController.createNewBook)

router
    .route('/:id')
    //get one book  
    .get(bookController.getParticularBook)
    //update book
    .put(
        authenticateMiddleware.checkUser, 
        authenticateMiddleware.checkAuthorOfBook,
        bookController.updateParticularBook
    )
    //delete book
    .delete(
        authenticateMiddleware.checkUser, 
        authenticateMiddleware.checkAuthorOfBook,
        bookController.deleteParticularBook
    )

module.exports = router;