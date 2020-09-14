const mongosse = require('mongoose');
const Client = mongosse.model('Client');
const ClientService = require('../services/ClientService');

exports.getByCellphone = async(cellphone) => {
    const resulSet = await Client.findOne({cellphone : cellphone});
    ClientService.notFound(resulSet);
    return resulSet;    
};