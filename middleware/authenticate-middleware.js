const {User, Book} = require('./../model');

const authenticateMiddleware = {
    checkUser: async(req, res, next)=>{
        try {
            const {user} = req.session;

            if(!user) throw new Error({message: 'unauthorized'});

            const {_id} = user;
            const myUser = await User.findById(_id);

            if(!myUser) throw new Error({message: 'session was fake'});

            req.user = user;
            next();
        } catch(err) {
            res.status(401).json({
                status: 'fail',
                message: err.message
            })
        }
    },
    checkAuthorOfBook: async(req, res, next)=>{
        const user = req.user;
        const {id} = req.params;
        try {
            const {book} = user;
            if(!book.some(book=>book===id)) throw new Error({message: 'you are not permission'});
            
            next();
        } catch(err){
            res.status(401).json({
                status: 'fail',
                message: err.message
            })
        }
    }
}

module.exports = authenticateMiddleware;