const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = new Schema({
    name: {
        type: String
    },
    district: {
        type: String
    },
    street:{
        type: String
    },
    number:{
        type: String
    },
    cellphone: {
        type: String
    },
    cep: {
        type: String
    }
});

module.exports = mongoose.model('Client', Client)