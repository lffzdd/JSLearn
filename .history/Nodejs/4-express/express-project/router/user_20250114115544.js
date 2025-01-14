const express = require('express')
const router = express.Router()
const userController = require('./controller/userController')
router
.post('/register',use)
.get('/list', userController.list).delete('/', userController.delete)
