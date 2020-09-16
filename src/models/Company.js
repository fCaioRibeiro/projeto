const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Company = new Schema({
    name: {
        type: String
    },
    address: {
        street: {
            type: String
        },
        district: {
            type: String
        },
        number: {
            type: String
        },
        cep: {
            type: String
        },
        complement: {
            type: String
        },
        cellphone: {
            type: String
        }
    },
    openingHours: {
        start: {
            type: Number
        },
        end: {
            type: Number
        }
    },
    link:{
        type: String
    },
    expirationData: {
        type: Date
    }
});

module.exports = mongoose.model('Company', Company)