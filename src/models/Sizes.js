const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sizes = new Schema({
    size: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Sizes', Sizes)