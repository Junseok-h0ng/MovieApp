const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String
    }
}, { timestamps: true })

const Comment = mongoose.model('comments', CommentSchema);

module.exports = { Comment }