const express = require('express')

const router = express.Router()

router.get('/list',(req,res,next)=>{
  console.log(req.url)
  res.send('/index')
})

router.get('/route',(req,res,next)=>{
  console.log(req.url)
  res.send('/route')
})

module.exports = router