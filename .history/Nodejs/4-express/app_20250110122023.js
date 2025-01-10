import { error } from 'console'
import express from 'express'
import { promises as fs } from 'fs'

const app = express()
app.use(express.urlencoded())
app.use(express.json())

const POST = 3000

app.get('/', async (req, res) => {
  try {
    let data = await fs.readFile('./users.json', 'utf-8')
    data=JSON.parse(data)
    res.send(data)
  } catch (error) {
    res.status(500).json(error)
  }
})

app.post('/',async(req,res)=>{
  body=req.body
  if (!req.body) {
    res.status(403).json({
      error:'缺少用户信息!'
    })
  }
})
app.listen(POST, () => {
  console.log(`Run http://127.0.0.1:${POST}`)
})

async function addUser(req,res){
  let data=await fs.readFile('./users.json','utf-8')
  data=JSON.parse(data)
  users=data.users
  
  lastId=users[users.length-1].id
  req.body.id=lastId+1
  data.users.push(req.body)
  tr
}