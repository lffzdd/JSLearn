const express = require('express')
const router = express.Router()
const videoController=require('./controller/videoController')

router
  .get('/lists', (req, res, next) => {
    console.log(req.url)
    res.send('/video-list')
  })
  .get('/route', (req, res, next) => {
    console.log(req.url)
    res.send('/route')
  })

module.exports = router
