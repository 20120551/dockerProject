const connect = {
    mongoConnection: require('./mongo-connect'),
    redisConnection: require('./redis-connect')
}

module.exports = {
    connect
}