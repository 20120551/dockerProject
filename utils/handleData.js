const bcrypt = require('bcrypt');

module.exports.generateSalt = async(saltRounds)=>{
    try {   
        const result = await bcrypt.genSalt(saltRounds)
        return result;   
    } catch(err) {
        throw err;
    }
}

module.exports.generateHashString = async(myString, salt)=>{
    try {
        const result = await bcrypt.hash(myString, salt);
        return result;
    } catch(err) {
        throw err;
    }
}

module.exports.compareString = async(myHashString, myEnterString)=>{
    try {
        const match = await bcrypt.compare(myEnterString, myHashString);
        return match;
    } catch(err) {
        throw err;
    }
}