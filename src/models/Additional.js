const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Additional = new Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Additional', Additional)