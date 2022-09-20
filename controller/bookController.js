const {Book, User} = require('./../model');

const bookController = {
    getAllBooks: async(req, res)=> {
        try {
            const books = await Book.find({}) || [];
            res.status(200).json({
                status: 'success',
                data: {
                    books
                },
                length: books.length
            })
        } catch(err) {
            res.status(404).json({
                status: 'fail',
                message: err.message,
            })
        }
    },
    createNewBook: async(req, res)=>{
        const {
            _id: userId
        } = req.user;
        
        const {
            title,
            totalPage,
            theme
        } = req.body;
        try {
            const book = new Book({
                title,
                totalPage,
                theme,
                author: userId
            });

            const result = await book.save();

            res.status(200).json({
                status: 'success',
                data: {
                    book: result
                }
            })
        } catch(err) {
            res.status(404).json({
                status: 'fail',
                message: err.message,
            })
        }
    },
    getParticularBook: async(req, res)=> {
        const {id} = req.params;
        try {
            const book = await Book.findById({_id: id});

            res.status(200).json({
                status: 'success',
                data: {
                    book
                }
            })
        } catch(err) {
            res.status(404).json({
                status: 'fail',
                message: err.message,
            })
        }
    },
    updateParticularBook: async(req, res)=>{
        const {id} = req.params;
        const {
            title,
            totalPage,
            theme
        } = req.body;
        try {
            const book = await Book.findOneAndUpdate({_id: id}, {
                $set: {
                    title: title,
                    totalPage: totalPage,
                    theme: theme
                }
            }, {new : true})

            res.status(200).json({
                status: 'success',
                data: {
                    book
                }
            })
        } catch(err) {
            res.status(404).json({
                status: 'fail',
                message: err.message,
            })
        }
    },
    deleteParticularBook: async(req, res)=>{
        const {id} = req.params;
        const {_id} = req.user;
        try {
            const book = await Book.findOneAndDelete({_id: id});
            await User.updateOne({_id: _id}, {$set: {book: []}});
            
            res.status(200).json({
                status: 'success',
                data: {
                    book
                }
            })
        } catch(err) {
            res.status(404).json({
                status: 'fail',
                message: err.message,
            })
        }
    },
}

module.exports = bookController;