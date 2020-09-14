const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        type: String,
        required: true,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }],
    isLoggedIn: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('User', schema);