const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

// 路由级别中间件

const router=express.Router()


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
