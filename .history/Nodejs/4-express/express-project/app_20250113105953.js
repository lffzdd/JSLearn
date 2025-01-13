const express = require('express')

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express()

const PORT = process.env.PORT || 3000

const logs=function(){
  
}

app.get('/', (req, res) => {
  console.log(`${req.method},${req.url},${Date.now()}`)
  res.send('/index')
})

app.get('/register', (req, res) => {
  console.log(`${req.method},${req.url},${Date.now()}`)
  res.send('/register')
})

app.get('/login', (req, res) => {
  console.log(`${req.method},${req.url},${Date.now()}`)
  res.send('/login')
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
