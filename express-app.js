const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const {
    REDIS_PORT,
    REDIS_URL,
    REDIS_SECRET
} = require('./config');
const {connect} = require('./lib');

const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");

const Router = require('./router');

module.exports = async(app)=>{
    //config req.body
    app.use(express.json({limit: '1mb'}));
    app.use(express.urlencoded({extended: true, limit: '1mb'}));

    //config header
    app.use(cors());

    //config cookie parser
    app.use(cookieParser());
    
    //config static file
    app.use(express.static(__dirname+'/public'));

    //connect to mongoDB
    await connect.mongoConnection();

        
    const redisUrl = `redis://${REDIS_URL}:${REDIS_PORT}`;
    let redisClient = createClient({
        url: redisUrl,
        legacyMode: true,
    });
    await connect.redisConnection(redisClient);

    //create session
    app.use(session({
        store: new RedisStore({client: redisClient}),
        secret: REDIS_SECRET,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 120000
        },
        resave: false,
        saveUninitialized: false,
    }))

    //create router
    Router(app);
}