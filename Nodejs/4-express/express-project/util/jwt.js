const jwt = require('jsonwebtoken')
const { jwtPublicKey, jwtPrivateKey } = require('../config')

module.exports.createToken = userinfo => {
	return new Promise((resolve, reject) => {
		jwt.sign(userinfo, jwtPrivateKey, { expiresIn: '1h' }, (err, token) => {
			if (err) {
				console.error('签发JWT失败', err)
				reject(err)
			} else {
				console.log('签发的JWT=>', token)
				resolve(token)
			}
		})
	})
}

/**
 *
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports.verifyToken = async (req, res, next) => {
	let token = req.headers.authorization
	token = token ? token.split('Bearer ')[1] : null
	if (!token) {
		res.status(402).json({ error: '请求头没有jwt,身份验证失败!' })
	}
	jwt.verify(token, jwtPublicKey, (err, decoded) => {
		if (err) {
			console.error('验证 JWT 失败:', err)
			res.status(402).json({ error: err })
		} else {
			console.log('解码的 JWT:', decoded)
			req.payload = decoded
			next()
		}
	})
}
