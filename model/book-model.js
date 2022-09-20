const mongoose = require('mongoose');
const User = require('./user-model');

const {Schema, model} = mongoose;

const Book = new Schema({
    title: {
        type: String,
        min: [4, 'Must be at least 4, got {VALUE}'],
        max: 30
    },
    totalPage: {
        type: String
    },
    theme: {
        type: String,
        enum: {
            values: ['adventure', 'action', 'horror'],
            message: '{VALUE} is not support',
            default: 'adventure'
        }
    },
    author: {
        type: Schema.ObjectId,
        ref: 'user'
    },
})
Book.pre('save', async function(next){
    const {
        author,
        _id
    } = this;
    await User.updateOne({_id: author}, {$push: {book: _id}});
    next();
})

module.exports = model('book', Book);