const express = require('express');
const controller = require('../controller/ItemController');
const itemRouter = express.Router();
const authService = require('../services/AuthService');
const multer = require('multer');
const multerConfig = require('../utils/UploadConfig');

itemRouter.post('/set', authService.isAdmin, controller.save);
itemRouter.get('/getById/:id', authService.authorize, controller.getById);
itemRouter.get('/list', authService.authorize, controller.list);
itemRouter.put('/update', authService.isAdmin, controller.update);
itemRouter.delete('/delete', authService.isAdmin, controller.delete);
itemRouter.post('/imageUpload', authService.isAdmin, multer(multerConfig).single('itemImage'), controller.upload);

module.exports = itemRouter;