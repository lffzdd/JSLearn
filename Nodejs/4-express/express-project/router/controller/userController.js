const { User } = require('../../db/index')
// const { user } = require( '../user' )

/**
 * Registers a new user.
 * @async
 * @function register
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 */

exports.register = async (req, res) => {
	console.log(req.body)
  const user = new User( req.body )
	const result = await user.save()
	res.status(201).json(result)
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
