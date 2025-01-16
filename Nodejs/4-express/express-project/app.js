const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/api/v1', router)

const POST = process.env.PORT || 3000

app.listen(POST, () => {
  console.log(`Run http://127.0.0.1:${POST}`)
})
