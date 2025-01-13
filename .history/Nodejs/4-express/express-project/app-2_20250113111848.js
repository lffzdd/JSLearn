const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

// 应用级别中间件



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
