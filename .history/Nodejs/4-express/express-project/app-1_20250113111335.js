const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

// app.use((req,res,next)=>{})

// app.get('/user',(req,res,next)=>{})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
