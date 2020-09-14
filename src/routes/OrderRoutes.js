const express = require('express');
const controller = require('../controller/OrderController');
const orderRouter = express.Router();
const authService = require('../services/AuthService');

orderRouter.post('/set', authService.authorize, controller.save);
orderRouter.get('/getById/:id', authService.authorize, controller.getById);
orderRouter.get('/list', authService.authorize, controller.list);
orderRouter.put('/update', authService.authorize, controller.update);
orderRouter.delete('/delete', authService.isAdmin, controller.delete);
orderRouter.put('/finalize', authService.authorize, controller.finalize);
orderRouter.get('/getByLastThreeDays', authService.authorize, controller.getByLastThreeDays);

module.exports = orderRouter;