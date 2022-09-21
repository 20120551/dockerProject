const express = require('express');
const expressApp = require('./express-app');
const app = express();

(async()=>{
    //config all in express app
    await expressApp(app);

    app.get('/api/vi', (req, res)=>{
        res.send('<h1>Hi there !!</h1>');
        console.log('we are here!');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, ()=>{
        console.log(`server is running on port ${PORT}`);
    }).on('error', ()=>{
        console.log(`Catch error when running this server`);
    })
})();