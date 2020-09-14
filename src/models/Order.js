const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    wasVisualized: {
        type: Boolean,
        default: false
    },
    user: {
        username: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    table: {
        type: String,
        required: true,
    },
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            require: true
        },
        half: {
            type: String,
        },
        observation: {
            type: String
        },
        size: {
            type: String
        },
        additional: [
            {
                name: {
                    type: String
                },
                price: {
                    type: Number
                }
            }
        ],
        edges: {
            name: {
                type: String
            },
            price: {
                type: Number
            }
        },
        hasAdditional: {
            type: Boolean,
            default: false
        }
    }],
    increase: {
        type: Number,
        default: 0.0
    },
    creationDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    observation: {
        type: String
    },
    orderValue: {
        type: Number,
        default: 0,
        require: true
    },
    totalValue: {
        type: Number,
        default: 0,
        require: true
    },
    client: {
        name: {
            type: String
        },
        district: {
            type: String
        },
        street: {
            type: String
        },
        number: {
            type: String
        },
        cellphone: {
            type: String
        },
        cep: {
            type: String
        }
    },
    exclusionDate: {
        type: Date
    },
    printingDate: {
        type: Date
    },
    payment: {
        card: {
            type: Boolean,
            default: false
        },
        money: {
            type: Boolean,
            default: false
        }
    }
});

module.exports = mongoose.model('Order', Order)