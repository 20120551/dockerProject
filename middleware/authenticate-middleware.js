const {User} = require('./../model');

const authenticateMiddleware = {
    checkUser: async(req, res, next)=>{
        try {
            const {user} = req.session;

            if(!user) throw new Error('unauthorized');

            const {_id} = user;
            const myUser = await User.findById({_id: _id});

            if(!myUser) throw new Error('session was fake');
            req.user = myUser;
            next();
        } catch(err) {
            console.log(err);
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

            if(!book.some(book=>book==id)) throw new Error('you are not permission');
            
            next();
        } catch(err){
            console.log(err);
            res.status(401).json({
                status: 'fail',
                message: err.message
            })
        }
    }
}

module.exports = authenticateMiddleware;