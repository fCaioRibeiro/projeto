const express = require('express');
const controller = require('../controller/UserController');
const userRouter = express.Router();
const authService = require('../services/AuthService');

userRouter.post('/set', authService.isAdmin, controller.save);
userRouter.post('/login', controller.getByUsernameAndPassword);
userRouter.put('/update', authService.isAdmin, controller.update);
userRouter.get('/logout', authService.authorize, controller.logout);
userRouter.get('/isAdmin', authService.isAdmin, controller.isAdmin);

module.exports = userRouter;
