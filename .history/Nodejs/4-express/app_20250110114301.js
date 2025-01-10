import express from 'express'
import {promises as fs} from 'fs'

const app = express()

const POST = 3000

app.get('/', async (req, res) => {
  try{
    let data = await fs.promises.readFile('./db.json','utf-8')
    res.send(data)
  }catch (error){
    res.status(500).json(error)
  }
})
app.listen(POST, () => {
  console.log(`Run http://127.0.0.1:${POST}`)
})
