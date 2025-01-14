const express = require('express')
const router = express.Router()
cosnt videoController=require('./controller')

router
  .get('/list', (req, res, next) => {
    console.log(req.url)
    res.send('/video-list')
  })
  .get('/route', (req, res, next) => {
    console.log(req.url)
    res.send('/route')
  })

module.exports = router
