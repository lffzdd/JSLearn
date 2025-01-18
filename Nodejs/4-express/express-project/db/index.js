const mongoose = require('mongoose')
!(async function main() {
	await mongoose
		.connect('mongodb://localhost:27017/express-video')
		.then(() => {
			console.log('MongoDB connected!')
		})
		.catch(err => {
			console.error('MongoDB connect failed', err)
		})
})()

module.exports = {
	User: mongoose.model('User', require('./userModel')),
}
