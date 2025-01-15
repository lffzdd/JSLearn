const express = require('express')
const router = require('./router')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)

const POST = 3000

app.listen(POST, () => {
	console.log(`Run http://127.0.0.1:${POST}`)
})
