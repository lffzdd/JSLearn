/**
 * Registers a new user.
 * @function register
 */

/**
 * Retrieves the list of users.
 * @async
 * @function list
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 */

/**
 * Deletes a user.
 * @async
 * @function delete
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 */
exports.register=()=>{}

exports.list=async (req,res)=>{
  console.log(req.url)
  res.send('/user-list')
  re
}

exports.delete=async (req,res)=>{
}