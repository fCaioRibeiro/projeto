const express = require('express');
const controller = require('../controller/SizesController');
const sizesRouter = express.Router();
const authService = require('../services/AuthService');

sizesRouter.post('/set', authService.isAdmin, controller.save);
sizesRouter.get('/list', authService.authorize, controller.list);

module.exports = sizesRouter;