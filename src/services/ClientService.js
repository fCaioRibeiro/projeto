const message = require('../exception/ErrorMessage');
const ClientException = require('../exception/ClientException');
const ClientRepository = require('../repository/ClientRepository');

exports.notFound = (client) => {
    if (!client) {
        throw new ClientException(message.messageClientNotFound());
    }
};