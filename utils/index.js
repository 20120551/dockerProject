const {
    validateEmail
} = require('./checkValid');

const {
    generateSalt,
    generateHashString,
    compareString
} = require('./handleData');

module.exports = {
    validateEmail,
    generateSalt,
    generateHashString,
    compareString
}