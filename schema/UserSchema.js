const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true
    },
    email: {type: String},
    insertedDate: {
        type: Date,
        default: Date.now
    }
}))