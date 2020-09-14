const express = require('express');
const controller = require('../controller/CategoryController');
const categoryRouter = express.Router();
const authService = require('../services/AuthService');

categoryRouter.post('/set', authService.isAdmin, controller.save);
categoryRouter.get('/getById/:id', authService.authorize, controller.getById);
categoryRouter.get('/list', authService.authorize, controller.list);

module.exports = categoryRouter;