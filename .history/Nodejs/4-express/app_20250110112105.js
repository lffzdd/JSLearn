import express from 'express'
import fs from 'fs'

const app = express()

const POST = 3000

app.get('/', (req, res) => {
  fs.readFile('./db.json', 'utf-8', (err, data) => {
    if (!err) {
      data=
      res.send(data)
    }
  })
})
app.listen(POST, () => {
  console.log(`Run http://127.0.0.1:${POST}`)
})