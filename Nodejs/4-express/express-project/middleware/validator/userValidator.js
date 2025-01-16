const { body } = require('express-validator')
const { User } = require('../../db/index')
module.exports.register = [
  body('username')
    .notEmpty()
    .withMessage('用户名不能为空!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('用户名长度不小于3')
    .bail(),
  body('email')
    .notEmpty()
    .withMessage('邮箱不能为空!')
    .bail()
    .isEmail()
    .withMessage('邮箱格式不正确!')
    .bail()
    .custom(async (val) => {
      const emailValidate = await User.findOne({ email: val })
      if (emailValidate) {
        return Promise.reject('邮箱已被注册!')
      }
    })
    .bail(),
  body('phone')
    .notEmpty()
    .withMessage('手机号不能为空!')
    .bail()
    .isMobilePhone()
    .withMessage('手机号格式不正确!')
    .bail()
    .custom(async (val) => {
      const phoneValidate = await User.findOne({ email: val })
      if (phoneValidate) {
        return Promise.reject('手机号已被注册!')
      }
    })
    .bail(),
]

module.exports.login = [
  body('email')
    .notEmpty()
    .withMessage('邮箱不能为空!')
    .bail()
    .isEmail()
    .withMessage('邮箱格式不正确!')
    .bail(),
  body('password').notEmpty().withMessage('密码不能为空!').bail(),
]
