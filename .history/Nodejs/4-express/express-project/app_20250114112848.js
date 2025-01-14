const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const rout

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(morgan('dev'))
app.use('/api/v1',require('./router/index'))