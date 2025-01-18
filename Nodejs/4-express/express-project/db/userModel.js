const mongoose = require('mongoose')
const userTemplate = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		// set: (val) => md5(val),
		select: false, // 查询的时候不返回password
	},
	phone: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		default: null,
	},
	createAt: {
		type: Date,
		default: Date.now(),
	},
	updateAt: {
		type: Date,
		default: Date.now(),
	},
})

module.exports = userTemplate