import express from 'express'
import fs from 'fs'

const app = express()

const POST = 3000

app.get('/', async (req, res) => {
  try{
    let data = await fs.readFile('./db.json','ut')
  }
})
app.listen(POST, () => {
  console.log(`Run http://127.0.0.1:${POST}`)
})