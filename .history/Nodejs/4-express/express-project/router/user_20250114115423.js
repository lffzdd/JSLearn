const express = require('express')
const router = express.Router()
const userController = require('./controller/userController')
router
.post
.get('/list', userController.list).delete('/', userController.delete)
