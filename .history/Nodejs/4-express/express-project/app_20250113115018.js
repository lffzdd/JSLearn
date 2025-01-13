const express = require('express')
const router = require('./router/index')

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express()
app.use('/users',router)
app.use('/video',require('./router/video'))

const PORT = process.env.PORT || 3000

app.use((req, res, next) => {
  console.log(`${req.method},${req.url},${Date.now()}`)
  next()
})

app.get('/', (req, res) => {
  res.send('/index')
})

app.get('/register', (req, res) => {
  res.send('/register')
})

app.get('/login', (req, res) => {
  res.send('/login')
})

app.use((req,res,next)=>{
  res.status(404).send('404 没有找到')
})

app.use((err,req,res,next)=>{
  console.log(err)
  res.status(500).send('服务器发生错误')
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
