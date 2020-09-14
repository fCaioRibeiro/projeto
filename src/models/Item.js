const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
    name:{
        type: String,
        required: true
    },
    dataSheet: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    sizes: [
        {
            size: {
                type: String
            },
            description: {
                type: String
            },
            price: {
                type: Number,
                default: 0.0
            },
            hasVariation: {
                type: Boolean,
                default: false
            }
        }
    ],  
    hasAdditional: {
        type: Boolean,
        default: false
    },
    hasEdges: {
        type: Boolean,
        default: false
    },
    image: {
        path: {
            type: String,
            trim: true,
            default: null
        },
        filename: {
            type: String,
            trim: true,
            default: null
        },
        originalname: {
            type: String,
            trim: true,
            default: null
        },
        key: {
            type: String,
            trim: true,
            default: null
        }
    }
});

module.exports = mongoose.model('Item', Item)