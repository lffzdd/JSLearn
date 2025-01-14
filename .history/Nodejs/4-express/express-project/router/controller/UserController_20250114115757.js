/**
 * Registers a new user.
 */
exports.register = () => {}

/**
 * Lists all users.
 * 
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
exports.list = async (req, res) => {
  console.log(req.url)
  res.send('/user-list')
}

/**
 * Deletes a user.
 * 
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
exports.delete = async (req, res) => {}
exports.register=()=>{}

exports.list=async (req,res)=>{
  console.log(req.url)
  res.send('/user-list')
}

exports.delete=async (req,res)=>{
}