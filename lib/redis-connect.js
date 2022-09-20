

async function redisConnection(client){
    try {
        //connect to redis
        await client.connect();
        console.log('connect to Redis successfully!'); 
    } catch(err) {
        console.log('catch error when connecting to Redis!');
    }
}

module.exports = redisConnection;