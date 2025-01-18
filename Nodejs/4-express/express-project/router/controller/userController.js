const { User } = require('../../db/index')
const { createToken } = require('../../util/jwt')

/**
 * Registers a new user.
 * @async
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 */

exports.register = async (req, res) => {
	console.log('收到注册请求:\n', req.body)
	const user = new User(req.body)
	let result = await user.save()
	result = result.toJSON()
	delete result.password
  res.status( 201 ).json( '注册成功:', result )
}
/**
 * 用户登录
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 */
exports.login = async (req, res) => {
	console.log('收到登录请求:\n', req.body)
	let dbReq = await User.findOne(req.body)
	if (dbReq) {
		dbReq = dbReq.toJSON()
		dbReq.token = await createToken(dbReq)
    res.status( 200 ).json( dbReq )
	} else {
		res.status(402).json({ error: '登录信息不正确' })
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
  console.log( req.url )
  console.log( req.payload )
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
