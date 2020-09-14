const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const OrderService = require('../services/OrderService');
const moment = require('moment');

exports.save = async(order) => {
    const ordersFromBD = await Order.find();
    await OrderService.emptyItems(order);
    await OrderService.isTableOpen(ordersFromBD, order);
    await OrderService.clientValidation(order);
    await OrderService.invalidQuantityAndPrice(order);
    await OrderService.invalidValue(order);
    await OrderService.invalidIncrease(order);
    await OrderService.linkValidity(order);
    await OrderService.saveClient(order , mongoose);
    
    let OrderEntity = new Order(order);
    return await OrderEntity.save();
};

exports.getById = async(id) => {
    return await Order.findById(id);
};

exports.list = async() => {
    let ordersFromBD = await Order.find({exclusionDate: ''});
    return OrderService.sort(ordersFromBD);
};

exports.update = async(newOrder) => {
    await OrderService.emptyItems(newOrder);
    await OrderService.invalidValue(newOrder);

    await Order.findByIdAndUpdate(newOrder._id, {
        $set: newOrder
    });
};

exports.delete = async(order) => {
    await Order.findByIdAndUpdate(order._id, {
        $set: order
    });
};

exports.finalize = async(order) => {
    await Order.findByIdAndUpdate(order._id, {
        $set: order
    })
};

exports.getByLastThreeDays = async() => {
    moment.locale('pt-br');
    let ordersFromDB = await Order.find({exclusionDate: ''});
    console.log(moment().subtract(3, 'days').format('L'));
    return ordersFromDB.filter(el => moment(el.creationDate).format('L') > moment().subtract(3, 'days').format('L'));
};