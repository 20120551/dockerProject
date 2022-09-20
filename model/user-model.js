const mongoose = require('mongoose');
const {validateEmail} = require('./../utils');

const {Schema, model} = mongoose;

const User = new Schema({
    username: {
        type: String,
        require: [true, 'Username must be require'],
        unique: true,
        validate: [validateEmail, 'Please fill this field with your email address'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    password: {
        type: String,
        require: true,
    },
    book: [{
        type: Schema.ObjectId,
        ref: 'book'
    }]
})
module.exports = model('user', User);