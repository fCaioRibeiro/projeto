const express = require('express');
const controller = require('../controller/CompanyController');
const companyRouter = express.Router();
const authService = require('../services/AuthService');

companyRouter.post('/set', authService.isAdmin, controller.save);
companyRouter.get('/get', authService.authorize, controller.findOne);

module.exports = companyRouter;