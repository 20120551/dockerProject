const {User} = require('./../model');
const {generateSalt, generateHashString, compareString} = require('./../utils');

const userController = {
    register: async(req, res)=>{
        const {username, password} = req.body;
        try {
            let user = await User.findOne({username: username});
            //check if user has existed
            if(user) throw new Error({message: 'user has existed'});
            //create new bcrypt password
            const salt = await generateSalt(10);
            const hashPassword = await generateHashString(password, salt);
            //create new user
            user = new User({
                username,
                password: hashPassword
            });

            const result = await user.save();
            res.status(200).json({
                status: 'success',
                data: {
                    user: result
                }
            })
        } catch(err){
            res.status(400).json({
                status: 'fail',
                message: err.message,
            })
        }
    },
    login: async(req, res)=>{
        const {username, password} = req.body;
        try {
            let user = await User.findOne({username: username});
            //check if user has existed
            if(!user) throw new Error({message: 'username does not found'});
            //compare password
            const match = await compareString(user.password, password);
            //check if password did not correct
            if(!match) throw new Error({message: 'your enter password did not correct'});
            //generate session id
            req.session.user = user;

            res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            })
        } catch(err) {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            })
        }
    },
    getAllPersonalBooks: async(req, res)=>{
        const {_id} = req.user;
        try {
            const user = await User.findById({_id: _id}).populate('book');

            if(!user) throw new Error({message: 'user was found on our system'});

            const {
                book
            } = user;
            
            res.status(200).json({
                status: 'success',
                data: {
                    book
                }
            })
        } catch(err) {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            })
        }
    },
    logout: async(req, res)=>{
        try {
            //delete session store in cookie
            req.session.destroy();
            res.status(200).json({
                status: 'success',
                data: {
                    user: req.user
                }
            })
        } catch(err) {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            })
        }
    } 
}

module.exports = userController;