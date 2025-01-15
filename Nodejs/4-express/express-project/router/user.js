const express = require('express')
const router = express.Router()

const userController = require('./controller/userController')
const { validate, userValid } = require('../middleware/validator/index')

router
	.post('/register', validate(userValid), userController.register)
	.get('/list', userController.list)
	.delete('/', userController.delete)

module.exports = router
