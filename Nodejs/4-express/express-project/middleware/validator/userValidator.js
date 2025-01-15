const { body } = require('express-validator')
module.exports = [
	body('username')
		.notEmpty()
		.withMessage('用户名不能为空!')
		.bail()
		.isLength({ min: 3 })
		.withMessage('用户名长度不小于3'),
	body('email').notEmpty().withMessage('邮箱不能为空!').isLength({ min: 3 }).withMessage('用户名长度不小于3'),
]
