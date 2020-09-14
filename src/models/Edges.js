const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Edges = new Schema({
    name: {
        type: String,
        required: true
    },
    sizes: [
        {
            size: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Edges', Edges)