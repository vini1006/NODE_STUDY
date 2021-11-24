const mongoose = require('mongoose');

module.exports = mongoose.model('Post', new mongoose.Schema({
    creator: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50,
    },
    text: {
        type: String,
        required: true
    },
    view: {
        type: Number
        , default: 0
    },
    insertedDate: {
        type: Date,
        default: Date.now
    }
}))