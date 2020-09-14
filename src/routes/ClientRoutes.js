const express = require('express');
const controller = require('../controller/ClientController');
const clientRouter = express.Router();
const authService = require('../services/AuthService');

clientRouter.get('/getByCellphone/:cellphone', authService.authorize, controller.getByCellphone);

module.exports = clientRouter;