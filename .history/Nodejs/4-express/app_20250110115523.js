import express from 'express'
import { promises as fs } from 'fs'

const app = express()

const POST = 3000

app.get('/', async (req, res) => {
  try {
    let data = await fs.readFile('./db1.json', 'utf-8')
    data=JSON.parse(data)
    res.send(data)
  } catch (error) {
    res.status(500).json(error)
  }
})

app.post('/',async(req,res)=>{
  console.log(req.body)
  res.end('postcheng')
})
app.listen(POST, () => {
  console.log(`Run http://127.0.0.1:${POST}`)
})
