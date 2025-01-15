const { validationResult } = require('express-validator')

module.exports.validate = validator => {
	return async (req, res, next) => {
		await Promise.all(validator.map(body => body.run(req)))
		const errors = validationResult(req)
		if (errors) {
			return res.status(401).json({ error: errors.array() })
		}
		next()
	}
}
module.exports.userValid = require('./userValidator')
