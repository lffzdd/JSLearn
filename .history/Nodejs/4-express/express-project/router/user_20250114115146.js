const express = require('express')
const router = express.Router()
const userController = require('./controller/')
router.get('/list', userController.list).delete('/', userController.delete)
