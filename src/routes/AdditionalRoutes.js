const express = require('express');
const controller = require('../controller/AdditionalController');
const additionalRouter = express.Router();
const authService = require('../services/AuthService');

additionalRouter.post('/set', authService.isAdmin, controller.save);
additionalRouter.get('/getById/:id', authService.authorize, controller.getById);
additionalRouter.get('/list', authService.authorize, controller.list);

module.exports = additionalRouter;