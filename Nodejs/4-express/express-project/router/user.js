const express = require('express')
const router = express.Router()

const userController = require('./controller/userController')
const { validate, userValid } = require('../middleware/validator/index')

router
	.post('/registers', validate(userValid.register), userController.register)
  .post('/logins',validate(userValid.login),userController.login)
	.get('/lists', userController.list)
	.delete('/', userController.delete)

module.exports = router
  