import express from 'express'
const app=express()

const POST=3000

app.get('/')
app.listen(POST,()=>{
  console.log(`Run http://127.0.0.1:${POST}`)
})