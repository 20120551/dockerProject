const mongoose = require('mongoose');
const {
    MONGO_NAME,
    MONGO_PASSWORD,
    MONGO_USER,
    MONGO_PORT,
} = require('./../config');

async function mongoConnection(){
    try {
        const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_NAME}:${MONGO_PORT}/`
        await mongoose.connect(mongoUrl);
        console.log('connect to DB successfully!');
    } catch(err) {
        console.log('catch error when connecting to DB!');
    }
}

module.exports = mongoConnection;