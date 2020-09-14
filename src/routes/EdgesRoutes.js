const express = require('express');
const controller = require('../controller/EdgesController');
const edgesRouter = express.Router();
const authService = require('../services/AuthService');

edgesRouter.post('/set', authService.isAdmin, controller.save);
edgesRouter.get('/getById/:id', authService.authorize, controller.getById);
edgesRouter.get('/list', authService.authorize, controller.list);

module.exports = edgesRouter;