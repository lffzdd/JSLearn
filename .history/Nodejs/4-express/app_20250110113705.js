import express from 'express'
import fs from 'fs'

const app = express()

const POST = 3000

app.get('/', async (req, res) => {
  fs.readFile('./db1.json', 'utf-8', (err, data) => {
    if (!err) {
      data=JSON.parse(data)
      res.send(data)
    }else{
      res.status(500).json({err})
    }
  })
})
app.listen(POST, () => {
  console.log(`Run http://127.0.0.1:${POST}`)
})