const userRouter = require('./user-router');
const bookRouter = require('./book-router');

function Router(app) {

    app.use('/api/vi/user', userRouter);
    app.use('/api/vi/book', bookRouter);
}

module.exports = Router;