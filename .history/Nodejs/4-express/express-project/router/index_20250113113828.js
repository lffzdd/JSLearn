const express = require('express')

const router = express.Router()

router.get('/',(req,res,next)=>{
  console.log(req.url)
  res.send('/index')
})

router.get('/route',(req,res,next)=>{
  console.log(req.url)
  res.send('/route')
})

module.exports = router