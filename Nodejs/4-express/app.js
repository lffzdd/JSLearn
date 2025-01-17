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
      const data = await addUser(req) // 这里不加await就会先运行下面的代码,届时data还没赋值
      console.log('写入数据成功')
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: '写入数据库失败' })
    }
})

app.put('/:id', async (req, res) => {
  if (!req.body) {
    res.status(403).json({
      error: '缺少用户信息!',
    })
  }
  try {
    await userPut(req, Number.parseInt(req.params.id))
    console.log(req.body)
    res.status(200).json(req.body)
    console.log('修改用户信息成功')
  } catch (error) {
    console.log(error)
    res.status(500).send('修改用户数据失败')
  }
})

app.listen(POST, () => {
  console.log(`Run http://127.0.0.1:${POST}`)
})

async function addUser(req) {
  let data = await getDb()
  let users = data.users

  const lastId = users[users.length - 1].id
  req.body.id = lastId + 1
  data.users.push(req.body)
  await putDb(data)
  return data
}

// async function getUser(params) {

// }
async function userPut(req, id) {
  const data = await getDb()
  const users=data.users
  users.forEach((element,index) => {
    if (element.id === id) {
      req.body.id = id
      users[index]=req.body
      // element = req.body
      // element.name = req.body.name 会修改原始数组中的元素，因为 element 是原始数组元素的引用。而 element = req.body 只是改变了 element 变量的引用，不会影响原始数组。


      // return req.body forEach内return只会退出当前的回调函数，而不会终止整个 forEach 循环
    }
  })
  await putDb(data)
}