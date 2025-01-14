const express = require('express')
const router = express.Router()
const userController = require('./controlle')
router.get('/list', userController.list).delete('/', userController.delete)
