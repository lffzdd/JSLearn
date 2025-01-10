import express from 'express'
import { promises as fs } from 'fs'
import { getDb, putDb } from './db.js'

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const POST = 3000

app.get('/', async (req, res) => {
  try {
    const data = await getDb()
    res.send(data)
  } catch (error) {
    res.status(500).json(error)
  }
})

app.post('/', async (req, res) => {
  if (!req.body) {
    res.status(403).json({
      error: '缺少用户信息!',
    })
  } else
    try {
      const data = await addUser(req, res) // 这里不加await就会先运行下面的代码,届时data还没赋值
      console.log('写入数据成功')
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: '写入数据库失败' })
    }
})

app.put('/:id', (req, res) => {
  try {
    
  } catch (error) {
    
  }
})

app.listen(POST, () => {
  console.log(`Run http://127.0.0.1:${POST}`)
})

async function addUser(req, res) {
  let data = await getDb()
  let users = data.users

  const lastId = users[users.length - 1].id
  req.body.id = lastId + 1
  data.users.push(req.body)
  await putDb(data)
  return data
}

async function userPut(params) {
  try {
    const data=await getDb()
    const user=data.user
    user.forEach(element => {
      
    });
  } catch (error) {
    
  }
}