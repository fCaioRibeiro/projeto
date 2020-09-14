const message = require('../exception/ErrorMessage');
const OrderException = require('../exception/OrderException');

exports.isTableOpen = (ordersFromBD, newOrder) => {
    if (!newOrder.table) {
        throw new OrderException(message.messageTableIsEmpty());
    };
    if (!(newOrder.table === 'Balcão') && !(newOrder.table === 'Entrega') && !(newOrder.table === 'Pedido')) {
        ordersFromBD.forEach(element => {
            if ((element.table === newOrder.table) && (!element.endDate)) {
                throw new OrderException(message.messageTableIsOpen(element.table));
            }
        });
    };
};

exports.emptyItems = (order) => {
    if ((!order.items) || (order.items.length <= 0)) {
        throw new OrderException(message.messageEmptyItems());
    }
};

exports.clientValidation = (order) => {
    if ((order.user.username === 'clientes')) {
        if (order.client.cellphone.length <= 10) {
            throw new OrderException(message.messageInvalidCellphone());
        }
        // if (order.client.cep.length <= 7) {
        //     throw new OrderException(message.messageInvalidCep());
        // }
    }
    
    if ((order.table === 'Entrega') || (order.user.username === 'clientes')) {
        if (order.client.name.length <= 6) {
            throw new OrderException(message.messageInvalidClientName());
        }
        if (order.client.district.length <= 3) {
            throw new OrderException(message.messageInvalidClientDistrict());
        }
        if (order.client.street.length <= 3) {
            throw new OrderException(message.messageInvalidClientStreet());
        }
        if (order.client.number.length <= 0) {
            throw new OrderException(message.messageInvalidNumber());
        }
    }

    if((order.table === 'Entrega') || (order.table === 'Balcão') || (order.user.username === 'clientes')){
        if ((order.payment.card === 'false') && (order.payment.money === 'false')) {
            throw new OrderException(message.messageInvalidPayment());
        }
    }
};

exports.invalidQuantityAndPrice = (order) => {
    order.items.forEach(element => {
        if (element.quantity && element.price) {
            element.quantity = element.quantity.replace(',', '.');
            element.price = element.price.replace(',', '.');
        };

        if (isNaN(element.quantity) || isNaN(element.price)) {
            throw new OrderException(message.messageInvalidQuantityAndPrice())
        }
    });
};

exports.invalidValue = (order) => {
    if (order.totalValue) {
        order.totalValue = order.totalValue.replace(',', '.');
    };
    if (isNaN(order.totalValue)) {
        throw new OrderException(message.messageInvalidValue())
    }
};

exports.invalidIncrease = (order) => {
    if (order.increase) {
        order.increase = order.increase.replace(',', '.');
    };
    if (isNaN(order.increase)) {
        throw new OrderException(message.messageInvalidIncrease())
    }
};

exports.sort = async (ordersFromBD) => {
    const closedOrders = await ordersFromBD.filter((comanda) => { return !!comanda.endDate }).sort(function (comandaA, comandaB) {
        if (comandaA.endDate > comandaB.endDate) {
            return -1;
        }
        if (comandaA.endDate < comandaB.endDate) {
            return 1;
        }
        return 0;
    });
    const openOrders = await ordersFromBD.filter((comanda) => { return !comanda.endDate }).sort(function (comandaA, comandaB) {
        if (comandaA.creationDate > comandaB.creationDate) {
            return -1;
        }
        if (comandaA.creationDate < comandaB.creationDate) {
            return 1;
        }
        return 0;
    });
    ordersFromBD = [];
    openOrders.forEach(element => {
        ordersFromBD.push(element);
    });
    closedOrders.forEach(element => {
        ordersFromBD.push(element);
    });
    return ordersFromBD;
};

exports.saveClient = async (order, mongoose) => {
    if (order.user.username === 'clientes') {
        const Client = mongoose.model('Client');
        if (order.client.id) {
            const clientFromDB = await Client.findById(order.client.id);
            if (clientFromDB.cellphone === order.client.cellphone) {
                await Client.findByIdAndUpdate(order.client.id, {
                    $set: order.client
                });
            }
        } else {
            await new Client(order.client).save();
        }
    }
};

exports.linkValidity = async (order) => {
    const companyRepository = require('../repository/CompanyRepository');
    const company = await companyRepository.findOne();

    if (order.user.username === 'clientes') {
        const date = new Date();
        const minutes = date.getMinutes();
        let hours = date.getHours() - 3;
        
        switch (hours) {
            case -3:
                hours = 21;
                break;
            case -2:
                hours = 22;
                break;
            case -1:
                hours = 23
                break;
            default:
                break;
        }
        let time = '00.00';
        if (minutes >= 10) {
            time = hours + '.' + minutes;
        } else {
            time = hours + '.0' + minutes;
        }
        time = parseFloat(time).toFixed(2);

        if ((time >= company.openingHours.start) && (time <= company.openingHours.end)) {
            console.log('Hora(s): ' + time);
        } else {
            console.log('Hora(s): ' + time);
            throw new OrderException(message.messageLinkValidity(company.openingHours.start.toFixed(2), company.openingHours.end.toFixed(2)));
        }
    }
};