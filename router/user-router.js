const express = require('express')
const {userController }= require('./../controller');
const {authenticateMiddleware} = require('./../middleware');

const router = express.Router()

//authenticate router
router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/book', authenticateMiddleware.checkUser, userController.getAllPersonalBooks);
router.post('/logout', authenticateMiddleware.checkUser, userController.logout);

module.exports = router;