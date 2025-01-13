const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

// 路由级别中间件

const router=express.Router() // Router不是类,而是一个函数,返回一个对象,这里是执行函数并返回对象

router.get('/',)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
