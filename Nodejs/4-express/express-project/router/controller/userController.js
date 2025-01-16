const { User } = require('../../db/index')
// const { user } = require( '../user' )

/**
 * Registers a new user.
 * @async
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 */

exports.register = async (req, res) => {
  console.log('收到注册请求:\n', req.body)
  const user = new User(req.body)
  const result = await user.save()
  res.status(201).json(result)
}
/**
 * 用户注册
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 */
exports.login = async (req, res) => {
  console.log('收到登录请求:\n', req.body)
  const dbReq = await User.findOne(req.body)
  if (dbReq) {
    res.status(200).json(dbReq)
  } else {
    res.status(401).json({ error: '登录信息不正确' })
  }
}

/**
 * Retrieves the list of users.
 * @async
 * @function list
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 */
exports.list = async (req, res) => {
  console.log(req.url)
  res.send('/user-list')
}

/**
 * Deletes a user.
 * @async
 * @function delete
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 */
exports.delete = async (req, res) => {}
